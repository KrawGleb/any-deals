using System.ComponentModel.DataAnnotations;

namespace SaM.AnyDeals.IdentityServer.Models;

public class RegisterViewModel
{
    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    [StringLength(int.MaxValue, MinimumLength = 6)]
    public string? Username { get; set; }

    [Required]
    [StringLength(int.MaxValue, MinimumLength = 6)]
    public string? Password { get; set; }

    [Required]
    [Compare("Password")]
    public string? ConfirmPassword { get; set; }

    public string? ReturnUrl { get; set; }
}
