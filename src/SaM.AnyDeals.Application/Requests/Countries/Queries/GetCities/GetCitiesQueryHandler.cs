using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Countries.Queries.GetCities;

public class GetCitiesQueryHandler : IRequestHandler<GetCitiesQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IMapper _mapper;

    public GetCitiesQueryHandler(
        ApplicationDbContext applicationDbContext, 
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetCitiesQuery request, CancellationToken cancellationToken)
    {
        var cities = await _applicationDbContext
            .Cities
            .Where(c => c.CountryId == request.CountryId)
            .OrderBy(c => c.Name)
            .ToListAsync(cancellationToken);
        var citiesVM = _mapper.Map<List<CityViewModel>>(cities);

        return new CommonResponse
        {
            Body = citiesVM
        };
    }
}
