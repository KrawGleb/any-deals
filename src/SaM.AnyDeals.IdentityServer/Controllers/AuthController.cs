using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SaM.AnyDeals.Common.Responses;
using SaM.AnyDeals.IdentityServer.Models;
using SaM.AnyDeals.IdentityServer.Services.Interfaces;

namespace SaM.AnyDeals.IdentityServer.Controllers;

[Route("[controller]")]
public class AuthController : Controller
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpGet]
    [Route("[action]")]
    public IActionResult Login([FromQuery] string returnUrl)
    {
        return View(new LoginViewModel { ReturnUrl = returnUrl });
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
}
