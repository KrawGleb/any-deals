﻿using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.DataAccess.Implementations;

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
        var countries = await _applicationDbContext.Countries.ToListAsync(cancellationToken);
        var countriesVM = _mapper.Map<List<CountryViewModel>>(countries);

        return new CommonResponse
        {
            Body = countriesVM
        };
    }
}
