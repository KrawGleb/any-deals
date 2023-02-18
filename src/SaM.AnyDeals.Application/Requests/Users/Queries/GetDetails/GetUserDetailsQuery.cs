namespace SaM.AnyDeals.Application.Requests.Users.Queries.GetDetails;

public record GetUserDetailsQuery(string Username)
    : IRequest<Response>;
