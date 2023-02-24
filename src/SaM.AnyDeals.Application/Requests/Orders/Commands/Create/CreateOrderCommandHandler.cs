using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.Common.Enums.Adverts;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Entries;
using Stripe;
using System.Linq;
using System.Threading;

namespace SaM.AnyDeals.Application.Requests.Orders.Commands.Create;

public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IPaymentServicesAccesor _paymentServicesAccesor;

    public CreateOrderCommandHandler(
        ApplicationDbContext applicationDbContext,
        ICurrentUserService currentUserService,
        IPaymentServicesAccesor paymentServicesAccesor)
    {
        _applicationDbContext = applicationDbContext;
        _currentUserService = currentUserService;
        _paymentServicesAccesor = paymentServicesAccesor;
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
        var paymentMethod = GetPaymentMethod(targetAdvert, request);
        var order = new OrderDbEntry()
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

        return new Response() { Succeeded = orderWasCommited };
    }

    private async Task<bool> TryCommitOrderAsync(CreateOrderCommand request, OrderDbEntry order, CancellationToken cancellationToken)
    {
        try
        {
            await _applicationDbContext.Orders.AddAsync(order, cancellationToken);
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            if (order.PaymentMethod == AnyDeals.Common.Enums.PaymentMethod.Card)
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

        var paymentService = _paymentServicesAccesor.PaymentIntentService;
        var intentDetails = paymentService.Get(paymentIntent);

        var options = new PaymentIntentCaptureOptions
        {
            AmountToCapture = intentDetails.AmountCapturable
        };
        var capture = await paymentService.CaptureAsync(paymentIntent, options);

        return capture;
    }

    private AnyDeals.Common.Enums.PaymentMethod? GetPaymentMethod(AdvertDbEntry advert, CreateOrderCommand request)
    {
        if (advert.Interest == Interest.Social)
            return null;

        if (request.PaymentMethod == AnyDeals.Common.Enums.PaymentMethod.Card &&
            (advert.AllowedCardPayment ?? false))
            return AnyDeals.Common.Enums.PaymentMethod.Card;
        else if (request.PaymentMethod == AnyDeals.Common.Enums.PaymentMethod.Cash &&
            (advert.AllowedCashPayment ?? false))
            return AnyDeals.Common.Enums.PaymentMethod.Cash;

        throw new InvalidOperationException("Failed to recognize payment method.");
    }
}
