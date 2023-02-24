using SaM.AnyDeals.Application.Common.Services.Interfaces;
using Stripe;

namespace SaM.AnyDeals.Application.Common.Services;

public class PaymentServicesAccesor : IPaymentServicesAccesor
{
    public PaymentIntentService PaymentIntentService { get => new(); }
    public RefundService RefundService { get => new(); }
}
