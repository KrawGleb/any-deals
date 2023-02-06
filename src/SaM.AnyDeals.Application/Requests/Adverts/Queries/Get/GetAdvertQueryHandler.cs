using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Extensions;

namespace SaM.AnyDeals.Application.Requests.Adverts.Queries.Get;

public class GetAdvertQueryHandler : IRequestHandler<GetAdvertQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IMapper _mapper;

    public GetAdvertQueryHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetAdvertQuery request, CancellationToken cancellationToken)
    {
        var viewModel = await GetAdvertAsync(request.Id, cancellationToken);

        return new CommonResponse { Body = viewModel };
    }

    private async Task<AdvertViewModel> GetAdvertAsync(int id, CancellationToken cancellationToken)
    {
        var entry = await _applicationDbContext.Adverts
            .AsNoTracking()
            .FullInclude()
            .SingleOrDefaultAsync(e => e.Id == id, cancellationToken)
            ?? throw new NotFoundException($"Advert with id {id} not found.");

        var viewModel = _mapper.Map<AdvertViewModel>(entry);

        return viewModel;
    }
}
