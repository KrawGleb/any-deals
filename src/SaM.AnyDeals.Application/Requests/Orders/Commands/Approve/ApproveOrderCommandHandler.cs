using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Orders.Commands.Approve;

public class ApproveOrderCommandHandler : IRequestHandler<ApproveOrderCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;

    public ApproveOrderCommandHandler(
        ApplicationDbContext applicationDbContext,
        ICurrentUserService currentUserService)
    {
        _applicationDbContext = applicationDbContext;
        _currentUserService = currentUserService;
    }

    public async Task<Response> Handle(ApproveOrderCommand request, CancellationToken cancellationToken)
    {
        var user = await _currentUserService.GetCurrentUserAsync();
        var userId = user.Id;
        var order = await _applicationDbContext
            .Orders
            .SingleOrDefaultAsync(o => o.Id == request.Id, cancellationToken)
            ?? throw new NotFoundException($"Order with id {request.Id} not found.");

        if (order.ExecutorId == userId)
            order.HasExecutorApproval = true;
        else if (order.CustomerId == userId)
            order.HasCustomerApproval = true;
        else
            throw new ForbiddenActionException();

        return new Response();
    }
}
