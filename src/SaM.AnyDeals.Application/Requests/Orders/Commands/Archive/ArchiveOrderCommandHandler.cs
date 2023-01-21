using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Orders.Commands.Archive;

public class ArchiveOrderCommandHandler : IRequestHandler<ArchiveOrderCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ArchiveOrderCommandHandler(
        ApplicationDbContext applicationDbContext,
        IHttpContextAccessor httpContextAccessor)
    {
        _applicationDbContext = applicationDbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Response> Handle(ArchiveOrderCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext.GetUserId();
        var order = await _applicationDbContext
            .Orders
            .SingleOrDefaultAsync(o => o.Id == request.Id, cancellationToken)
            ?? throw new NotFoundException($"Order with id {request.Id} not found.");

        if (order.ExecutorId == userId)
            order.ArchivatedByExecutor = true;
        else if (order.CustomerId == userId)
            order.ArchivatedByCustomer = true;
        else
            throw new ForbiddenActionException();

        return new Response();
    }
}
