using Stripe;

namespace SaM.AnyDeals.Application.Common.Services.Interfaces;

public interface IPaymentServicesAccessor
{
    PaymentIntentService PaymentIntentService { get; }
}