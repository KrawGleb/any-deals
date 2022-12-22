using MediatR;
using SaM.AnyDeals.Application.Models.Responses;

namespace SaM.AnyDeals.Application.Requests.Auth.Queries.Login;

public class LoginQuery : IRequest<Response>
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}
