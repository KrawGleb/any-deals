using MediatR;
using SaM.AnyDeals.Application.Models.Responses;

namespace SaM.AnyDeals.Application.Requests.Auth.Commands.Register;

public class RegisterCommand : IRequest<Response>
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
}
