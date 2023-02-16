using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Interfaces;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Requests.Chat.Commands.Send;

public class SendMessageCommandHandler : IRequestHandler<SendMessageCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IChatService _chatService;

    public SendMessageCommandHandler(
        ApplicationDbContext applicationDbContext,
        IChatService chatService,
        ICurrentUserService currentUserService)
    {
        _applicationDbContext = applicationDbContext;
        _chatService = chatService;
        _currentUserService = currentUserService;
    }

    public async Task<Response> Handle(SendMessageCommand request, CancellationToken cancellationToken)
    {
        var user = await _currentUserService.GetCurrentUserAsync();
        var userId = user.Id;
        var order = await _applicationDbContext
            .Orders
            .Include(o => o.Chat)
                .ThenInclude(c => c!.Messages)
            .FirstOrDefaultAsync(o => o.Id == request.OrderId &&
                                (o.ExecutorId == userId || o.CustomerId == userId), cancellationToken)
            ?? throw new NotFoundException($"Order with id {request.OrderId} not found.");

        var message = new MessageDbEntry
        {
            SenderId = userId,
            Text = request.Text
        };

        order.Chat!.Messages!.Add(message);

        await _chatService.NotifyAsync("NewMessage", userId, cancellationToken);

        return new Response();
    }
}
