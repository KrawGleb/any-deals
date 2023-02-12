using System.ComponentModel.DataAnnotations;

namespace SaM.AnyDeals.IdentityServer.Models;

public class LoginViewModel
{
    [Required]
    [EmailAddress]
    [StringLength(100)]
    public string? Email { get; set; }

    [Required]
    [StringLength(35, MinimumLength = 6)]
    public string? Password { get; set; }

    public string? ReturnUrl { get; set; }
}
