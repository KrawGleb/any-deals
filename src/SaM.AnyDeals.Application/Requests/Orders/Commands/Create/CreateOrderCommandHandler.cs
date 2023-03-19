using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.Common.Enums.Adverts;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.DataAccess.Models.Entries;
using Stripe;
using PaymentMethod = SaM.AnyDeals.Common.Enums.PaymentMethod;

namespace SaM.AnyDeals.Application.Requests.Orders.Commands.Create;

public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IPaymentServicesAccessor _paymentServicesAccessor;

    public CreateOrderCommandHandler(
        ApplicationDbContext applicationDbContext,
        ICurrentUserService currentUserService,
        IPaymentServicesAccessor paymentServicesAccessor)
    {
        _applicationDbContext = applicationDbContext;
        _currentUserService = currentUserService;
        _paymentServicesAccessor = paymentServicesAccessor;
    }

    public async Task<Response> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var advert = await _applicationDbContext
                         .Adverts
                         .SingleOrDefaultAsync(a => a.Id == request.AdvertId, cancellationToken)
                     ?? throw new NotFoundException($"Advert with id {request.AdvertId} not found.");
        ThrowExceptionIfAdvertIsDraft(advert);

        var initiator = await _currentUserService.GetCurrentUserAsync();
        var (executorId, customerId) = GetActorsIds(advert, initiator);
        ThrowExceptionIfCustomerAndExecutorAreSame(customerId, executorId);    
        
        var paymentMethod = GetPaymentMethod(advert, request);
        var order = new OrderDbEntry
        {
            AdvertId = request.AdvertId,
            PaymentMethod = paymentMethod,
            CustomerId = customerId,
            ExecutorId = executorId,
            CreatedAt = DateTime.UtcNow,
            Chat = new ChatDbEntry()
        };

        var succeeded = await TryCommitOrderAsync(request, order, cancellationToken);
        if (!succeeded) await RollbackOrderAsync(order);

        return new Response { Succeeded = succeeded };
    }

    private (string ExecutorId, string CustomerId) GetActorsIds(AdvertDbEntry advert, ApplicationUser initiator)
    {
        return advert.Goal == Goal.Offer
            ? (advert.CreatorId!, initiator.Id!)
            : (initiator.Id!, advert.CreatorId!);
    }

    private async Task<bool> TryCommitOrderAsync(
        CreateOrderCommand request,
        OrderDbEntry order,
        CancellationToken cancellationToken)
    {
        try
        {
            await _applicationDbContext.Orders.AddAsync(order, cancellationToken);
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            if (order.PaymentMethod == PaymentMethod.Card)
            {
                var paymentIntent = await CapturePaymentAsync(request.PaymentIntent);
                if (paymentIntent.Status != "succeeded")
                    return false;
            }
        }
        catch
        {
            return false;
        }

        return true;
    }

    private async Task RollbackOrderAsync(OrderDbEntry order)
    {
        var savedOrder = await _applicationDbContext
            .Orders
            .SingleOrDefaultAsync(o => o.Id == order.Id);

        if (savedOrder is not null)
        {
            _applicationDbContext.Orders.Remove(savedOrder);
            await _applicationDbContext.SaveChangesAsync();
        }
    }

    private async Task<PaymentIntent> CapturePaymentAsync(string? paymentIntent)
    {
        _ = paymentIntent
            ?? throw new ArgumentNullException(nameof(paymentIntent));

        var paymentService = _paymentServicesAccessor.PaymentIntentService;
        var intentDetails = await paymentService.GetAsync(paymentIntent);

        var options = new PaymentIntentCaptureOptions
        {
            AmountToCapture = intentDetails.AmountCapturable
        };
        var capture = await paymentService.CaptureAsync(paymentIntent, options);

        return capture;
    }

    private PaymentMethod? GetPaymentMethod(AdvertDbEntry advert, CreateOrderCommand request)
    {
        if (advert.Goal == Goal.Request ||
            advert.Interest == Interest.Social)
            return null;

        return request.PaymentMethod switch
        {
            PaymentMethod.Card when (advert.AllowedCardPayment ?? false) => PaymentMethod.Card,
            PaymentMethod.Cash when (advert.AllowedCashPayment ?? false) => PaymentMethod.Cash,
            _ => throw new InvalidOperationException("Failed to recognize payment method.")
        };
    }

    private void ThrowExceptionIfAdvertIsDraft(AdvertDbEntry advert)
    {
        if (advert.Status == Status.Draft)
            throw new ForbiddenActionException("Cannot create order for draft advert.");
    }

    private void ThrowExceptionIfCustomerAndExecutorAreSame(string customerId, string executorId)
    {
        if (customerId == executorId)
            throw new ForbiddenActionException("Customer and executor are the same user.");
    }
}