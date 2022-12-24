using MediatR;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Requests.Adverts.Commands;
using SaM.AnyDeals.DataAccess.Interfaces.Repositories;

namespace SaM.AnyDeals.Application.Handlers.Adverts.CommandHandlers;

public class DeleteAdvertCommandHandler : IRequestHandler<DeleteAdvertCommand, Response>
{
    private readonly IAdvertsRepository _advertsRepository;

    public DeleteAdvertCommandHandler(IAdvertsRepository advertsRepository)
    {
        _advertsRepository = advertsRepository;
    }

    public async Task<Response> Handle(DeleteAdvertCommand request, CancellationToken cancellationToken)
    {
        await _advertsRepository.DeleteAsync(request.Id, cancellationToken);

        return new Response();
    }
}
