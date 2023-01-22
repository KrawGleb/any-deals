using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Requests.Reviews.Commands.Create;

public class CreateReviewCommandHandler : IRequestHandler<CreateReviewCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;

    public CreateReviewCommandHandler(ApplicationDbContext applicationDbContext, IHttpContextAccessor httpContextAccessor, IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
    }

    public async Task<Response> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext.GetUserId();
        var user = await _applicationDbContext
            .Users
            .Include(u => u.Reviews)
            .SingleAsync(u => u.Id == userId, cancellationToken);

        var reviewEntry = _mapper.Map<ReviewDbEntry>(request);

        user.Reviews!.Add(reviewEntry);

        return new Response();
    }
}
