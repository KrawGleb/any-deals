using AutoMapper;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Application.Models.ViewModels;

namespace SaM.AnyDeals.Application.Requests.Users.Queries.GetMe;

public class GetMeQueryHandler : IRequestHandler<GetMeQuery, Response>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public GetMeQueryHandler(
        ICurrentUserService currentUserService,
        IMapper mapper)
    {
        _currentUserService = currentUserService;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetMeQuery request, CancellationToken cancellationToken)
    {
        var currentUser = await _currentUserService.GetCurrentUserAsync();
        var userVM = _mapper.Map<ApplicationUserViewModel>(currentUser);

        return new CommonResponse { Body = userVM };
    }
}