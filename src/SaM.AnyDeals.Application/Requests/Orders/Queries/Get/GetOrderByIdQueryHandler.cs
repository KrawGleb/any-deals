using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Entries;
using System.Threading;

namespace SaM.AnyDeals.Application.Requests.Orders.Queries.Get;

public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;

    public GetOrderByIdQueryHandler(
        ApplicationDbContext applicationDbContext,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext.GetUserId();
        var order = await _applicationDbContext
            .Orders
            .SingleOrDefaultAsync(a => a.Id == request.Id, cancellationToken)
            ?? throw new NotFoundException($"Order with id {request.Id} not found.");

        if (order.ExecutorId != userId &&
            order.CustomerId != userId)
            throw new ForbiddenActionException("Full order data can get only customer or executor");

        await LoadOrdersReferenceAsync(order, cancellationToken);

        var orderVM = _mapper.Map<OrderViewModel>(order);

        return new CommonResponse()
        {
            Body = orderVM
        };
    }

    private async Task LoadOrdersReferenceAsync(OrderDbEntry order, CancellationToken cancellationToken)
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
