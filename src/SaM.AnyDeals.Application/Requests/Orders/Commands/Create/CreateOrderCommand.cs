using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.Application.Requests.Orders.Commands.Create;

public record CreateOrderCommand(
    int AdvertId,
    PaymentMethod PaymentMethod)
    : IRequest<Response>, IChangeDataRequest;
