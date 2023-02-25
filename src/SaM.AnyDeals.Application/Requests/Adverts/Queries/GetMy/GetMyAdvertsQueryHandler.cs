using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Exceptions;
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

        await _applicationDbContext.Users.Entry(creator)
            .Collection(e => e.Adverts!)
            .Query()
            .FullInclude()
            .LoadAsync(cancellationToken);

        var advertsVM = _mapper.Map<List<AdvertViewModel>>(creator.Adverts);

        return new CommonResponse
        {
            Body = advertsVM
        };
    }
}
