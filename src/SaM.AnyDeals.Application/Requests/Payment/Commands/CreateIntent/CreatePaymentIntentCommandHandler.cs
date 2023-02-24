using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;
using Stripe;

namespace SaM.AnyDeals.Application.Requests.Payment.Commands.CreateIntent;

public class CreatePaymentIntentCommandHandler : IRequestHandler<CreatePaymentIntentCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IPaymentServicesAccesor _paymentServicesAccesor;

    public CreatePaymentIntentCommandHandler(
        ApplicationDbContext applicationDbContext,
        IPaymentServicesAccesor paymentServicesAccesor)
    {
        _applicationDbContext = applicationDbContext;
        _paymentServicesAccesor = paymentServicesAccesor;
    }

    public async Task<Response> Handle(CreatePaymentIntentCommand request, CancellationToken cancellationToken)
    {
        var advert = await _applicationDbContext
            .Adverts
            .SingleOrDefaultAsync(a => a.Id == request.AdvertId, cancellationToken)
            ?? throw new NotFoundException($"Advert with id {request.AdvertId} not found.");

        var paymentService = _paymentServicesAccesor.PaymentIntentService;
        var paymentIntent = paymentService.Create(new PaymentIntentCreateOptions
        {
            Amount = (long)(advert.Price! * 100),
            Currency = "usd",
            AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
            {
                Enabled = true
            },
            PaymentMethodOptions = new PaymentIntentPaymentMethodOptionsOptions
            {
                Card = new PaymentIntentPaymentMethodOptionsCardOptions
                {
                    CaptureMethod = "manual",
                },
            },
        });

        return new CommonResponse
        {
            Body = new { paymentIntent.ClientSecret }
        };
    }
}
