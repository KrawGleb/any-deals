using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.Common;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Users.Queries.GetDetails;

public class GetUserDetailsQueryHandler : IRequestHandler<GetUserDetailsQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IMapper _mapper;

    public GetUserDetailsQueryHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetUserDetailsQuery request, CancellationToken cancellationToken)
    {
        var user = await _applicationDbContext
                       .Users
                       .Include(u => u.Adverts!)
                       .ThenInclude(a => a.Category!)
                       .Include(u => u.Adverts!)
                       .ThenInclude(a => a.Reviews)
                       .Include(u => u.Adverts!)
                       .ThenInclude(a => a.Contacts!)
                       .Include(u => u.Orders)
                       .SingleOrDefaultAsync(
                           u => u.UserName == request.Username,
                           cancellationToken)
                   ?? throw new NotFoundException($"User with username {request.Username} not found.");

        var averageRatings = user
            .Adverts!
            .GroupBy(advert => advert.Category!.Name)
            .Select(grouped => new AverageRatingDescription
            {
                Category = grouped.Key,
                ReviewsCount = grouped.Sum(x => x.Reviews!.Count),
                AverageRating = grouped.Average(
                    x => x.Reviews!.Count == 0
                        ? 0
                        : x.Reviews.Average(a => a.Grade))
            })
            .Where(res => res.ReviewsCount > 0)
            .ToList();

        var adverts = user
            .Adverts!
            .Where(a => a.Status == Status.Accepted)
            .ToList();

        var userVM = _mapper.Map<ApplicationUserViewModel>(user);
        var advertsVM = _mapper.Map<List<AdvertViewModel>>(adverts);

        var response = new GetUserDetailsResponse
        {
            User = userVM,
            Adverts = advertsVM,
            AverageRatingDescriptions = averageRatings
        };

        return new CommonResponse
        {
            Body = response
        };
    }
}