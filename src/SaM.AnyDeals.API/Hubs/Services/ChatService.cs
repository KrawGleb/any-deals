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

    public async Task NotifyAsync(string method, object? arg = null, CancellationToken cancellationToken = default)
        => await _context.Clients.All.SendAsync(method, arg, cancellationToken);
}
