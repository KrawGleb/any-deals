using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Chat.Queries.Get;

public class GetChatMessagesQueryHandler : IRequestHandler<GetChatMessagesQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IMapper _mapper;

    public GetChatMessagesQueryHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetChatMessagesQuery request, CancellationToken cancellationToken)
    {
        var order = await _applicationDbContext
                        .Orders
                        .Include(o => o.Chat)
                        .FirstOrDefaultAsync(o => o.Id == request.OrderId, cancellationToken)
                    ?? throw new NotFoundException($"Order with id {request.OrderId} not found.");

        var messages = await _applicationDbContext
            .Messages
            .Include(m => m.Sender)
            .Where(m => m.ChatId == order.ChatId)
            .OrderBy(m => m.CreatedAt)
            .ToListAsync(cancellationToken);

        var messagesVM = _mapper.Map<List<MessageViewModel>>(messages);

        return new CommonResponse
        {
            Body = messagesVM
        };
    }
}