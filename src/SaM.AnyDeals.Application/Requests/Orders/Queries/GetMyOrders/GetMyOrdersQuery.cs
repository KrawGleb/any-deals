namespace SaM.AnyDeals.Application.Requests.Orders.Queries.GetMyOrders;

public record GetMyOrdersQuery(bool AsExecutor = false) : IRequest<Response>;