using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Enums.Adverts;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Entries;

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

        await AddFundsOnCompletedOrderAsync(order, cancellationToken);

        return new Response();
    }

    private async Task AddFundsOnCompletedOrderAsync(OrderDbEntry order, CancellationToken cancellationToken)
    {
        if (!order.HasCustomerApproval)
            return;

        await _applicationDbContext
            .Orders
            .Entry(order)
            .Reference(o => o.Advert)
            .LoadAsync(cancellationToken);

        if (order.Advert!.Interest == Interest.Social || order.Advert.Price is null)
            return;

        await _applicationDbContext
            .Orders
            .Entry(order)
            .Reference(o => o.Executor)
            .LoadAsync(cancellationToken);

        order.Executor!.Balance += order.Advert!.Price ?? 0;

        await _applicationDbContext.SaveChangesAsync(cancellationToken);
    }
}