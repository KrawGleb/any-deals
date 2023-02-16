using System.ComponentModel.DataAnnotations;

namespace SaM.AnyDeals.IdentityServer.Models;

public class ExternalRegisterViewModel
{
    [Required]
    [StringLength(35)]
    public string? Username { get; set; }

    public string? ReturnUrl { get; set; }
}
