using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Requests.Orders.Queries.Get;

public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public GetOrderByIdQueryHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper,
        ICurrentUserService currentUserService)
    {
        _applicationDbContext = applicationDbContext;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<Response> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
    {
        var user = await _currentUserService.GetCurrentUserAsync();
        var userId = user.Id;
        var order = await _applicationDbContext
                        .Orders
                        .SingleOrDefaultAsync(a => a.Id == request.Id, cancellationToken)
                    ?? throw new NotFoundException($"Order with id {request.Id} not found.");

        if (order.ExecutorId != userId &&
            order.CustomerId != userId)
            throw new ForbiddenActionException("Full order data can get only customer or executor");

        await LoadOrdersReferencesAsync(order, cancellationToken);

        var orderVM = _mapper.Map<OrderViewModel>(order);

        return new CommonResponse
        {
            Body = orderVM
        };
    }

    private async Task LoadOrdersReferencesAsync(OrderDbEntry order, CancellationToken cancellationToken)
    {
        await _applicationDbContext
            .Orders
            .Entry(order)
            .Reference(o => o.Customer)
            .LoadAsync(cancellationToken);

        await _applicationDbContext
            .Orders
            .Entry(order)
            .Reference(o => o.Executor)
            .LoadAsync(cancellationToken);

        await _applicationDbContext
            .Orders
            .Entry(order)
            .Reference(o => o.Advert)
            .LoadAsync(cancellationToken);
    }
}