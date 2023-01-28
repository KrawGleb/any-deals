namespace SaM.AnyDeals.Application.Requests.Chat.Commands.Send;

public record SendMessageCommand(int OrderId, string Text)
    : IRequest<Response>, IChangeDataRequest;
