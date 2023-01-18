namespace SaM.AnyDeals.Application.Requests.Orders.Commands.Create;

public record CreateOrderCommand(int AdvertId)
    : IRequest<Response>, IChangeDataRequest;
