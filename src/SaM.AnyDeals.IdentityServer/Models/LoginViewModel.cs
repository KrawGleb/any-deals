using Microsoft.AspNetCore.Authentication;
using System.ComponentModel.DataAnnotations;

namespace SaM.AnyDeals.IdentityServer.Models;

public class LoginViewModel
{
    [Required]
    [StringLength(35)]
    public string? Username { get; set; }

    [Required]
    [StringLength(35, MinimumLength = 6)]
    public string? Password { get; set; }

    public string? ReturnUrl { get; set; }
    public IEnumerable<AuthenticationScheme>? ExternalProviders { get; set; }
}
