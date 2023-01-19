namespace SaM.AnyDeals.Application.Requests.Orders.Queries.GetMy;

public record GetMyOrdersQuery(bool AsExecutor = false) : IRequest<Response>;
