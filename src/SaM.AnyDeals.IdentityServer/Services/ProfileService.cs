﻿using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using SaM.AnyDeals.DataAccess.Models.Auth;
using System.Security.Claims;

namespace SaM.AnyDeals.IdentityServer.Services;

public class ProfileService : IProfileService
{
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ILogger<ProfileService> _logger;
    public ProfileService(
        UserManager<ApplicationUser> userManager,
        IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
        RoleManager<IdentityRole> roleManager,
        ILogger<ProfileService> logger)
    {
        _userManager = userManager;
        _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        _roleManager = roleManager;
        _logger = logger;
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        _logger.LogInformation("Try to add user roles claims");
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
                _logger.LogInformation("Role {role} was added", roleName);
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
