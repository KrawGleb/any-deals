using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.DataAccess;

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

        var query = await _applicationDbContext
            .Adverts
            .Include(a => a.Contacts)
            .Include(a => a.Attachments)
            .Include(a => a.Category)
            .Where(a => a.CreatorId == creator.Id)
            .ToListAsync(cancellationToken);

        await _applicationDbContext
            .Adverts
            .Where(a => query.Contains(a))
            .Include(a => a.City)
            .ThenInclude(c => c!.Country)
            .LoadAsync(cancellationToken);

        var advertsVM = _mapper.Map<List<AdvertViewModel>>(query);

        return new CommonResponse { Body = advertsVM };
    }
}