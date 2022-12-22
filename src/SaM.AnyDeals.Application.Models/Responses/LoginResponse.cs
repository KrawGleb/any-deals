namespace SaM.AnyDeals.Application.Models.Responses;

public class LoginResponse : Response
{
    public string? Username { get; set; }
    public string? Token { get; set; }
}
