using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Responses;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.IdentityServer.Models;
using SaM.AnyDeals.IdentityServer.Services.Interfaces;
using System.Security.Claims;

namespace SaM.AnyDeals.IdentityServer.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IIdentityServerInteractionService _interactionService;

    public AuthService(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IIdentityServerInteractionService interactionService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _interactionService = interactionService;
    }

    public async Task<Response> LoginAsync(LoginViewModel loginViewModel, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(loginViewModel.Username!);

        if (user is null)
        {
            return new ErrorResponse
            {
                Errors = new string[] { $"User with email {loginViewModel.Username} not found." }
            };
        }

        var result = await _signInManager.PasswordSignInAsync(user, loginViewModel.Password!, false, false);

        return result.Succeeded
            ? new Response()
            : new ErrorResponse { Errors = new string[] { "Invalid email or password." } };
    }

    public async Task<LogoutResponse> LogoutAsync(string logoutId, CancellationToken cancellationToken)
    {
        await _signInManager.SignOutAsync();
        var logoutRequest = await _interactionService.GetLogoutContextAsync(logoutId);

        return new() { RedirectUri = logoutRequest.PostLogoutRedirectUri };
    }

    public async Task<Response> RegisterAsync(RegisterViewModel registerViewModel, CancellationToken cancellationToken)
    {
        var user = new ApplicationUser
        {
            Email = registerViewModel.Email,
            UserName = registerViewModel.Username
        };

        var result = await _userManager.CreateAsync(user, registerViewModel.Password!);
        if (result.Succeeded)
        {
            await _signInManager.SignInAsync(user, false);
            return new Response();
        }

        return new ErrorResponse { Errors = result.Errors.Select(e => e.Description) };
    }

    public async Task<Response> ExternalRegisterAsync(ExternalLoginInfo info, CancellationToken cancellationToken)
    {
        var username = info.Principal.FindFirst(ClaimTypes.Name)!.Value;
        var user = new ApplicationUser
        {
            UserName = username
        };

        var result = await _userManager.CreateAsync(user);
        var addLoginResult = await _userManager.AddLoginAsync(user, info);

        if (result.Succeeded && addLoginResult.Succeeded)
        {
            await _signInManager.SignInAsync(user, false);
            return new Response();
        }

        return new ErrorResponse();
    }
}
