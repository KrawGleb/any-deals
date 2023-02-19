using Braintree;
using Microsoft.Extensions.Configuration;
using SaM.AnyDeals.Application.Common.Services.Interfaces;

namespace SaM.AnyDeals.Application.Common.Services;

public class PaymentService : IPaymentService
{
    private readonly IConfiguration _configuration;

    public PaymentService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public IBraintreeGateway GetGateway()
        => new BraintreeGateway()
        {
            Environment = Braintree.Environment.SANDBOX,
            MerchantId = _configuration.GetSection("BraintreeGateway:MerchatId").Value,
            PublicKey = _configuration.GetSection("BraintreeGateway:PublicKey").Value,
            PrivateKey = _configuration.GetSection("BraintreeGateway:PrivateKey").Value
        };
}
