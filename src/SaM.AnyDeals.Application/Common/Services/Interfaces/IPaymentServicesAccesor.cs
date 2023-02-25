using Stripe;

namespace SaM.AnyDeals.Application.Common.Services.Interfaces;

public interface IPaymentServicesAccesor
{
    PaymentIntentService PaymentIntentService { get; }
}