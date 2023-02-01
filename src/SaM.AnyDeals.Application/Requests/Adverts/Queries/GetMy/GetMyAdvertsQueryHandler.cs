using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Extensions;
using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.Application.Requests.Adverts.Queries.GetMy;

public class GetMyAdvertsQueryHandler : IRequestHandler<GetMyAdvertsQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public GetMyAdvertsQueryHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper,
        ICurrentUserService currentUserService)
    {
        _applicationDbContext = applicationDbContext;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<Response> Handle(GetMyAdvertsQuery request, CancellationToken cancellationToken)
    {
        var creator = await _currentUserService.GetCurrentUserAsync();

        var adverts = await _applicationDbContext.Adverts
            .AsNoTracking()
            .FullInclude()
            .Where(a => a.CreatorId == creator.Id)
            .ToListAsync(cancellationToken);
        var advertsVM = _mapper.Map<List<AdvertViewModel>>(adverts);

        return new CommonResponse
        {
            Body = advertsVM
        };
    }
}
