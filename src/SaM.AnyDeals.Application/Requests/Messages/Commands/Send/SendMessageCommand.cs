namespace SaM.AnyDeals.Application.Requests.Messages.Commands.Send;

public record SendMessageCommand(int OrderId, string Text) 
    : IRequest<Response>, IChangeDataRequest;
