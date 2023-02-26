namespace SaM.AnyDeals.Application.Requests.Chat.Queries.Get;

public record GetChatMessagesQuery(int OrderId) : IRequest<Response>;