using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Reviews.Queries.Get;

public class GetAdvertsReviewsQueryHandler : IRequestHandler<GetAdvertsReviewsQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IMapper _mapper;

    public GetAdvertsReviewsQueryHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetAdvertsReviewsQuery request, CancellationToken cancellationToken)
    {
        var reviews = await _applicationDbContext
            .Reviews
            .Include(r => r.Author)
            .Where(r => r.AdvertId == request.Id)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var reviewsVM = _mapper.Map<List<ReviewViewModel>>(reviews);

        return new CommonResponse
        {
            Body = reviewsVM
        };
    }
}