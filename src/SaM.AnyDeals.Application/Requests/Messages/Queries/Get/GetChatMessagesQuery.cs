namespace SaM.AnyDeals.Application.Requests.Messages.Queries.Get;

public record GetChatMessagesQuery(int OrderId): IRequest<Response>;

