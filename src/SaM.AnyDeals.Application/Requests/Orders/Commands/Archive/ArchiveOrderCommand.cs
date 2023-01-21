namespace SaM.AnyDeals.Application.Requests.Orders.Commands.Archive;

public record ArchiveOrderCommand(int Id) : IRequest<Response>, IChangeDataRequest;
