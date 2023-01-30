namespace SaM.AnyDeals.Common.Responses;

public class LoginResponse : Response
{
    public string? Id { get; set; }
    public string? Username { get; set; }
    public bool IsAdmin { get; set; } = false;
    public string? Token { get; set; }
}
