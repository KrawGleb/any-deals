using MediatR;
using SaM.AnyDeals.Application.Models.Interfaces;
using SaM.AnyDeals.Application.Models.Responses;

namespace SaM.AnyDeals.Application.Requests.Auth.Commands.Register;

public record RegisterCommand(
    string? Username, 
    string? Email, 
    string? Password) :
    IRequest<Response>;
