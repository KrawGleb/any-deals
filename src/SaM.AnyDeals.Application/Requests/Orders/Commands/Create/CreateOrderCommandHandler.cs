using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Requests.Orders.Commands.Create;

public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;

    public CreateOrderCommandHandler(
        ApplicationDbContext applicationDbContext,
        ICurrentUserService currentUserService)
    {
        _applicationDbContext = applicationDbContext;
        _currentUserService = currentUserService;
    }

    public async Task<Response> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var targetAdvert = await _applicationDbContext
            .Adverts
            .SingleOrDefaultAsync(a => a.Id == request.AdvertId, cancellationToken)
            ?? throw new NotFoundException($"Advert with id {request.AdvertId} not found.");

        var customer = await _currentUserService.GetCurrentUserAsync();
        var customerId = customer.Id;
        var executorId = targetAdvert.CreatorId;

        var order = new OrderDbEntry()
        {
            AdvertId = request.AdvertId,
            CustomerId = customerId,
            ExecutorId = executorId,
            Chat = new ChatDbEntry()
        };

        await _applicationDbContext.Orders.AddAsync(order, cancellationToken);

        return new Response();
    }
}
