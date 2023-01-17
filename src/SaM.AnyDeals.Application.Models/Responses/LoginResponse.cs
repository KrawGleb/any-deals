namespace SaM.AnyDeals.Application.Models.Responses;

public class LoginResponse : Response
{
    public string? Username { get; set; }
    public bool IsAdmin { get; set; } = false;
    public string? Token { get; set; }
}
