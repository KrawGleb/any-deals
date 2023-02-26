using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Orders.Queries.GetMy;

public class GetMyOrdersQueryHandler : IRequestHandler<GetMyOrdersQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public GetMyOrdersQueryHandler(
        ApplicationDbContext applicationDbContext,
        ICurrentUserService currentUserService,
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetMyOrdersQuery request, CancellationToken cancellationToken)
    {
        var user = await _currentUserService.GetCurrentUserAsync();
        var userId = user.Id;
        var query = _applicationDbContext
            .Orders
            .Include(o => o.Advert)
            .Include(o => o.Executor)
            .Include(o => o.Customer)
            .AsNoTracking();

        query = request.AsExecutor
            ? query.Where(
                o => o.ExecutorId == userId &&
                     o.ArchivatedByExecutor == request.Archivated)
            : query.Where(
                o => o.CustomerId == userId &&
                     o.ArchivatedByCustomer == request.Archivated);

        var orders = await query.ToListAsync(cancellationToken);
        var ordersVM = _mapper.Map<List<OrderViewModel>>(orders);

        return new CommonResponse
        {
            Body = ordersVM
        };
    }
}