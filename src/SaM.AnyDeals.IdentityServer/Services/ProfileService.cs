using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using SaM.AnyDeals.DataAccess.Models.Auth;
using System.Security.Claims;

namespace SaM.AnyDeals.IdentityServer.Services;

public class ProfileService : IProfileService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public ProfileService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var user = await _userManager.GetUserAsync(context.Subject);
        var roles = await _userManager.GetRolesAsync(user!);
        var roleClaims = roles.Select(role => new Claim(JwtClaimTypes.Role, role));

        context.IssuedClaims.AddRange(roleClaims);
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        return Task.CompletedTask;
    }
}
