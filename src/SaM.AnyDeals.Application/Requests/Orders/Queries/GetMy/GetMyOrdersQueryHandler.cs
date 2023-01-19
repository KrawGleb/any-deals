using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Orders.Queries.GetMy;

public class GetMyOrdersQueryHandler : IRequestHandler<GetMyOrdersQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;

    public GetMyOrdersQueryHandler(
        ApplicationDbContext applicationDbContext,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetMyOrdersQuery request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext.GetUserId();
        var query = _applicationDbContext
            .Orders
            .Include(o => o.Advert)
            .Include(o => o.Executor)
            .Include(o => o.Customer)
            .AsNoTracking();

        query = request.AsExecutor
            ? query.Where(o => o.ExecutorId == userId)
            : query.Where(o => o.CustomerId == userId);

        var orders = await query.ToListAsync(cancellationToken);
        var ordersVM = _mapper.Map<List<OrderViewModel>>(orders);

        return new CommonResponse
        {
            Body = ordersVM,
        };
    }
}
