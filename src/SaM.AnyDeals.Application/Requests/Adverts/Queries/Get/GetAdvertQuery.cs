namespace SaM.AnyDeals.Application.Requests.Adverts.Queries.Get;

public record GetAdvertQuery(int Id) : IRequest<Response>;
