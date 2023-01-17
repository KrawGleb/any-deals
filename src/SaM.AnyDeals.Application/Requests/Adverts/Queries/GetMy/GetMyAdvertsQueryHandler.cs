using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Extensions;

namespace SaM.AnyDeals.Application.Requests.Adverts.Queries.GetMy;

public class GetMyAdvertsQueryHandler : IRequestHandler<GetMyAdvertsQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;

    public GetMyAdvertsQueryHandler(
        ApplicationDbContext applicationDbContext,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetMyAdvertsQuery request, CancellationToken cancellationToken)
    {
        var creatorId = _httpContextAccessor.HttpContext.GetUserId();
        var adverts = await _applicationDbContext.Adverts
            .AsNoTracking()
            .FullInclude()
            .Where(a => a.CreatorId == creatorId)
            .ToListAsync(cancellationToken);
        var advertsVM = _mapper.Map<List<AdvertViewModel>>(adverts);

        return new CommonResponse
        {
            Body = advertsVM
        };
    }
}
