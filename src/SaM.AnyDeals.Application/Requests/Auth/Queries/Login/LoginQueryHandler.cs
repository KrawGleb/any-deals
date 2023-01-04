using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SaM.AnyDeals.Application.Models.Configurations;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess.Models.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SaM.AnyDeals.Application.Requests.Auth.Queries.Login;

public class LoginQueryHandler : IRequestHandler<LoginQuery, Response>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly JWTConfiguration _jwtConfiguration;

    public LoginQueryHandler(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IOptions<JWTConfiguration> jwtConfiguration)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _jwtConfiguration = jwtConfiguration.Value;
    }

    public async Task<Response> Handle(LoginQuery request, CancellationToken cancellationToken)
    {
        return await SignInAsync(request);
    }

    private async Task<Response> SignInAsync(LoginQuery request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email!)
            ?? throw new NotFoundException("User not found.");
        var signInResult = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, false, false);

        if (signInResult.Succeeded)
        {
            var token = GenerateToken(user);

            return new LoginResponse()
            {
                Username = user.UserName,
                Token = token,
            };
        }

        return new ErrorResponse() { Errors = new string[] { "Invalid email or password." } };
    }

    private string GenerateToken(ApplicationUser user)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_jwtConfiguration.Key!);

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Issuer = "AnyDealsBackend",
            Audience = "AnyDealsFrontend",
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("id", user.Id),
            }),
            Expires = DateTime.UtcNow.AddHours(12),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        return jwtTokenHandler.WriteToken(token);
    }
}
