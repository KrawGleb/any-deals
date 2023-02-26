using SaM.AnyDeals.Application.Common.Services.Interfaces;
using Stripe;

namespace SaM.AnyDeals.Application.Common.Services;

public class PaymentServicesAccessor : IPaymentServicesAccessor
{
    public PaymentIntentService PaymentIntentService => new();
}