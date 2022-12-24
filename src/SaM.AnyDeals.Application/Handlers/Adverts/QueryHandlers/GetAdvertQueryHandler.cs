using AutoMapper;
using MediatR;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Application.Requests.Adverts.Queries;
using SaM.AnyDeals.DataAccess.Interfaces.Repositories;

namespace SaM.AnyDeals.Application.Handlers.Adverts.QueryHandlers;

public class GetAdvertQueryHandler : IRequestHandler<GetAdvertQuery, Response>
{
    private readonly IAdvertsRepository _advertsRepository;
    private readonly IMapper _mapper;

    public GetAdvertQueryHandler(
        IAdvertsRepository advertsRepository,
        IMapper mapper)
    {
        _advertsRepository = advertsRepository;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetAdvertQuery request, CancellationToken cancellationToken)
    {
        var viewModel = await GetAdvertAsync(request.Id, cancellationToken);

        return new CommonResponse { Body = viewModel };
    }

    private async Task<AdvertViewModel> GetAdvertAsync(int id, CancellationToken cancellationToken)
    {
        var entry = await _advertsRepository.GetByIdAsync(id, false, cancellationToken);
        var viewModel = _mapper.Map<AdvertViewModel>(entry);

        return viewModel;
    }
}
