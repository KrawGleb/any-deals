namespace SaM.AnyDeals.Application.Requests.Orders.Commands.Approve;

public record ApproveOrderCommand(int Id) : IRequest<Response>, IChangeDataRequest;

