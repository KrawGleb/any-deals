using MediatR;
using SaM.AnyDeals.Application.Models.Responses;

namespace SaM.AnyDeals.Application.Requests.Auth.Queries.Login;

public record LoginQuery(
    string? Email,
    string? Password) :
    IRequest<Response>;
