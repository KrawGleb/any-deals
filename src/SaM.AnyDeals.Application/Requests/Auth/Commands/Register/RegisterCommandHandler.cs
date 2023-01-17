using Microsoft.AspNetCore.Identity;
using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.Application.Requests.Auth.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Response>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public RegisterCommandHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Response> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var result = await RegisterUserAsync(request);

        return result.Succeeded
            ? new Response()
            : new ErrorResponse() { Errors = result.Errors.Select(e => e.Description) };
    }

    private async Task<IdentityResult> RegisterUserAsync(RegisterCommand request)
    {
        var user = new ApplicationUser()
        {
            UserName = request.Username,
            Email = request.Email
        };

        var result = await _userManager.CreateAsync(user, request.Password!);

        return result;
    }
}
