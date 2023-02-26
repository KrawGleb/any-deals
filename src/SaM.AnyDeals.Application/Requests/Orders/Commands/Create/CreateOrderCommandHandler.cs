using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Enums.Adverts;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;
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
        var targetAdvert = await _applicationDbContext
                               .Adverts
                               .SingleOrDefaultAsync(a => a.Id == request.AdvertId, cancellationToken)
                           ?? throw new NotFoundException($"Advert with id {request.AdvertId} not found.");

        var customer = await _currentUserService.GetCurrentUserAsync();
        var customerId = customer.Id;
        var executorId = targetAdvert.CreatorId;

        if (customerId == executorId)
                throw new ForbiddenActionException("Customer and executor ids are the same.");
        
        var paymentMethod = GetPaymentMethod(targetAdvert, request);
        var order = new OrderDbEntry
        {
            AdvertId = request.AdvertId,
            PaymentMethod = paymentMethod,
            CustomerId = customerId,
            ExecutorId = executorId,
            CreatedAt = DateTime.UtcNow,
            Chat = new ChatDbEntry()
        };

        var orderWasCommited = await TryCommitOrderAsync(request, order, cancellationToken);
        if (!orderWasCommited) await RollbackOrderAsync(request, order);

        return new Response { Succeeded = orderWasCommited };
    }

    private async Task<bool> TryCommitOrderAsync(CreateOrderCommand request, OrderDbEntry order,
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

    private async Task RollbackOrderAsync(CreateOrderCommand request, OrderDbEntry order)
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
        var intentDetails = paymentService.Get(paymentIntent);

        var options = new PaymentIntentCaptureOptions
        {
            AmountToCapture = intentDetails.AmountCapturable
        };
        var capture = await paymentService.CaptureAsync(paymentIntent, options);

        return capture;
    }

    private PaymentMethod? GetPaymentMethod(AdvertDbEntry advert, CreateOrderCommand request)
    {
        if (advert.Interest == Interest.Social)
            return null;

        if (request.PaymentMethod == PaymentMethod.Card &&
            (advert.AllowedCardPayment ?? false))
        {
            return PaymentMethod.Card;
        }

        if (request.PaymentMethod == PaymentMethod.Cash &&
            (advert.AllowedCashPayment ?? false))
        {
            return PaymentMethod.Cash;
        }

        throw new InvalidOperationException("Failed to recognize payment method.");
    }
}