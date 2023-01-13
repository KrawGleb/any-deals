﻿using AutoMapper;
using MediatR;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Common.Models;
using SaM.AnyDeals.DataAccess.Services.Interfaces;

namespace SaM.AnyDeals.Application.Requests.Adverts.Queries.Search;

public class SearchAdvertsQueryHandler : IRequestHandler<SearchAdvertsQuery, Response>
{
    private readonly IElasticService _elasticService;
    private readonly IMapper _mapper;

    public SearchAdvertsQueryHandler(
        IElasticService elasticService,
        IMapper mapper)
    {
        _elasticService = elasticService;
        _mapper = mapper;
    }

    public async Task<Response> Handle(SearchAdvertsQuery request, CancellationToken cancellationToken)
    {
        var searchParams = _mapper.Map<SearchAdvertsParams>(request);
        var adverts = await _elasticService.SearchAdvertsAsync(searchParams);

        return new CommonResponse
        {
            Body = adverts
        };
    }
}