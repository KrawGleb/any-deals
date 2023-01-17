using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Delete;

public class DeleteAdvertCommandHandler : IRequestHandler<DeleteAdvertCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;

    public DeleteAdvertCommandHandler(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<Response> Handle(DeleteAdvertCommand request, CancellationToken cancellationToken)
    {
        var application = await _applicationDbContext.Adverts.FindAsync(request.Id, cancellationToken)
            ?? throw new NotFoundException($"Application with id {request.Id} not found.");

        _applicationDbContext.Adverts.Remove(application);

        return new Response();
    }
}
