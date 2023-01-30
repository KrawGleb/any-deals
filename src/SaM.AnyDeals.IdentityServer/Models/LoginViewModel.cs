namespace SaM.AnyDeals.IdentityServer.Models;

public class LoginViewModel
{
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? ReturnUrl { get; set; }
}
