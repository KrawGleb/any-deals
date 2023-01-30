using SaM.AnyDeals.Common.Responses;
using SaM.AnyDeals.IdentityServer.Models;

namespace SaM.AnyDeals.IdentityServer.Services.Interfaces;

public interface IAuthService
{
    Task<Response> LoginAsync(LoginViewModel loginViewModel, CancellationToken cancellationToken);
    Task<Response> RegisterAsync(RegisterViewModel registerViewModel, CancellationToken cancellationToken);
    Task<LogoutResponse> LogoutAsync(string logoutId, CancellationToken cancellationToken);
}
