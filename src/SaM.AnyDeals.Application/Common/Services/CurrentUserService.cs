using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.Application.Common.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;

    public CurrentUserService(
        IHttpContextAccessor httpContextAccessor,
        UserManager<ApplicationUser> userManager)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }

    public async Task<ApplicationUser> GetCurrentUserAsync()
    {
        var userClaim = _httpContextAccessor.HttpContext.User;
        var user = await _userManager.GetUserAsync(userClaim)
                   ?? throw new NotFoundException("User not found.");

        return user;
    }
}