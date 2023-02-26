using System.Security.Claims;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.IdentityServer.Services;

public class ProfileService : IProfileService
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly UserManager<ApplicationUser> _userManager;

    public ProfileService(
        UserManager<ApplicationUser> userManager,
        IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
        RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        _roleManager = roleManager;
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var user = await _userManager.GetUserAsync(context.Subject);
        var userClaims = await _userClaimsPrincipalFactory.CreateAsync(user!);

        var claims = userClaims.Claims
            .Where(claim => context.RequestedClaimTypes.Contains(claim.Type))
            .ToList();

        if (_userManager.SupportsUserRole)
        {
            var roles = await _userManager.GetRolesAsync(user!);
            foreach (var roleName in roles)
            {
                claims.Add(new Claim(JwtClaimTypes.Role, roleName));

                if (_roleManager.SupportsRoleClaims)
                {
                    var role = await _roleManager.FindByNameAsync(roleName);

                    if (role is not null)
                        claims.AddRange(await _roleManager.GetClaimsAsync(role));
                }
            }
        }

        context.IssuedClaims = claims;
    }

    public async Task IsActiveAsync(IsActiveContext context)
    {
        var sub = context.Subject.GetSubjectId();
        var user = await _userManager.FindByIdAsync(sub);
        context.IsActive = user is not null;
    }
}