using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Admins.Commands.UpdateAdvertStatus;

public class UpdateAdvertStatusCommandHandler : IRequestHandler<UpdateAdvertStatusCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;

    public UpdateAdvertStatusCommandHandler(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<Response> Handle(UpdateAdvertStatusCommand request, CancellationToken cancellationToken)
    {
        var entry = await _applicationDbContext
            .Adverts
            .SingleOrDefaultAsync(a => a.Id == request.Id!, cancellationToken)
            ?? throw new NotFoundException($"Advert with id {request.Id} not found.");

        entry.Status = request.Status;

        return new Response();
    }
}
