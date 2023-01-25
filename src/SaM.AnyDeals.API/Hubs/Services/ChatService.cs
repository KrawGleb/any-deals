using Microsoft.AspNetCore.SignalR;
using SaM.AnyDeals.Common.Interfaces;

namespace SaM.AnyDeals.API.Hubs.Services;

public class ChatService : IChatService
{
    private readonly IHubContext<ChatHub> _context;

    public ChatService(IHubContext<ChatHub> context)
    {
        _context = context;
    }

    public async Task NotifyGroupAsync(Guid group, string notification, object? arg = null, CancellationToken cancellationToken = default)
        => await _context.Clients.Group(group.ToString()).SendAsync(notification, arg, cancellationToken);

}
