using Braintree;

namespace SaM.AnyDeals.Application.Common.Services.Interfaces;

public interface IPaymentService
{
    IBraintreeGateway GetGateway();
}
