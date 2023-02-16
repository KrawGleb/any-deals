using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Requests.Reviews.Commands.Create;

public class CreateReviewCommandHandler : IRequestHandler<CreateReviewCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public CreateReviewCommandHandler(
        ApplicationDbContext applicationDbContext,
        ICurrentUserService currentUserService,
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }

    public async Task<Response> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
    {
        var userId = (await _currentUserService.GetCurrentUserAsync()).Id;
        var user = await _applicationDbContext
            .Users
            .Include(u => u.Reviews)
            .SingleAsync(u => u.Id == userId, cancellationToken);

        var reviewEntry = _mapper.Map<ReviewDbEntry>(request);

        user.Reviews!.Add(reviewEntry);

        return new Response();
    }
}
