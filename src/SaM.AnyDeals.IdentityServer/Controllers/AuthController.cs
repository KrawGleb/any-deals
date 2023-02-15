using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SaM.AnyDeals.Common.Responses;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.IdentityServer.Models;
using SaM.AnyDeals.IdentityServer.Services.Interfaces;
using System.Security.Claims;

namespace SaM.AnyDeals.IdentityServer.Controllers;

[Route("[controller]")]
public class AuthController : Controller
{
    private readonly IAuthService _authService;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthController(
        IAuthService authService,
        SignInManager<ApplicationUser> signInManager)
    {
        _authService = authService;
        _signInManager = signInManager;
    }

    [HttpGet]
    [Route("[action]")]
    public async Task<IActionResult> Login([FromQuery] string returnUrl)
    {
        var externalProviders = await _signInManager.GetExternalAuthenticationSchemesAsync();

        return View(new LoginViewModel
        {
            ReturnUrl = returnUrl,
            ExternalProviders = externalProviders
        });
    }

    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> Login([FromForm] LoginViewModel loginViewModel, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return View(loginViewModel);

        var response = await _authService.LoginAsync(loginViewModel, cancellationToken);

        if (response.Succeeded)
            return Redirect(loginViewModel.ReturnUrl!);

        var errorResponse = response as ErrorResponse;

        var errorId = 0;
        errorResponse?
            .Errors?
            .ToList()
            .ForEach((error) => ModelState.AddModelError($"ErrorResponse{errorId}", error));

        return View(loginViewModel);
    }

    [HttpGet]
    [Route("[action]")]
    public IActionResult Register([FromQuery] string returnUrl)
    {
        return View(new RegisterViewModel { ReturnUrl = returnUrl });
    }

    [HttpPost]
    [Route("[action]")]
    public async Task<IActionResult> Register([FromForm] RegisterViewModel registerViewModel, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
            return View(registerViewModel);

        var response = await _authService.RegisterAsync(registerViewModel, cancellationToken);

        if (response.Succeeded)
            return Redirect(registerViewModel.ReturnUrl!);

        var errorResponse = response as ErrorResponse;

        var errorId = 0;
        errorResponse?
            .Errors?
            .ToList()
            .ForEach((error) => ModelState.AddModelError($"ErrorResponse{errorId++}", error));

        return View(registerViewModel);
    }

    [HttpGet]
    [Route("[action]")]
    public async Task<IActionResult> Logout([FromQuery] string logoutId, CancellationToken cancellationToken)
    {
        var response = await _authService.LogoutAsync(logoutId, cancellationToken);

        return Redirect(response.RedirectUri!);
    }

    [Route("[action]")]
    public IActionResult ExternalLogin(string provider, string returnUrl, CancellationToken cancellationToken)
    {
        var redirectUri = Url.Action(nameof(ExternalLoginCallback), "Auth", new { returnUrl });
        var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUri);

        return Challenge(properties, provider);
    }

    [Route("[action]")]
    public async Task<IActionResult> ExternalLoginCallback(string returnUrl, CancellationToken cancellationToken)
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        if (info is null)
            return RedirectToAction("Login", new { ReturnUrl = returnUrl });

        var result = await _signInManager.ExternalLoginSignInAsync(
            info.LoginProvider,
            info.ProviderKey,
            false);

        if (result.Succeeded)
        {
            return Redirect(returnUrl);
        }

        var response = await _authService.ExternalRegisterAsync(info, cancellationToken);
        if (response.Succeeded)
        {
            return Redirect(returnUrl);
        }

        return RedirectToAction("Login", new { ReturnUrl = returnUrl });
    }
}
