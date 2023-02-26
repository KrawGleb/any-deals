using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Countries.Queries.Get;

public class GetCountriesQueryHandler : IRequestHandler<GetCountriesQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IMapper _mapper;

    public GetCountriesQueryHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetCountriesQuery request, CancellationToken cancellationToken)
    {
        var countries = await _applicationDbContext
            .Countries
            .OrderBy(c => c.Name)
            .ToListAsync(cancellationToken);
        var countriesVM = _mapper.Map<List<CountryViewModel>>(countries);

        return new CommonResponse
        {
            Body = countriesVM
        };
    }
}