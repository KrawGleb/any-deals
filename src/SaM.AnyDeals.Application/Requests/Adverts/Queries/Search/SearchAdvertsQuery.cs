using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.Application.Requests.Adverts.Queries.Search;

public record SearchAdvertsQuery(
    string? Title,
    string? Country,
    string? City,
    string? Category,
    int? Goal,
    int? Interest,
    int? Group,
    int? Status = (int)Status.Accepted,
    int Page = 1,
    int PageSize = 25)
    : IRequest<Response>;
