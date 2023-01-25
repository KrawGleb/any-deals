using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Nest;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.Common.Interfaces;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Requests.Messages.Commands.Send;

public class SendMessageCommandHandler : IRequestHandler<SendMessageCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IChatService _chatService;

    public SendMessageCommandHandler(
        ApplicationDbContext applicationDbContext,
        IHttpContextAccessor httpContextAccessor,
        IChatService chatService)
    {
        _applicationDbContext = applicationDbContext;
        _httpContextAccessor = httpContextAccessor;
        _chatService = chatService;
    }

    public async Task<Response> Handle(SendMessageCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext.GetUserId();
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

        await _chatService.NotifyGroupAsync(order.Chat.Id, "NewMessage", message.Text, cancellationToken);

        return new Response();
    }
}
