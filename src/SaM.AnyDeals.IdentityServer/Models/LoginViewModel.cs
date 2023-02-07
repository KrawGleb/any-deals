using System.ComponentModel.DataAnnotations;

namespace SaM.AnyDeals.IdentityServer.Models;

public class LoginViewModel
{
    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    [StringLength(int.MaxValue, MinimumLength = 6)]
    public string? Password { get; set; }

    public string? ReturnUrl { get; set; }
}
