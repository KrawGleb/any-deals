namespace SaM.AnyDeals.Application.Requests.Orders.Queries.Get;

public record GetOrderByIdQuery(int Id) : IRequest<Response>;
