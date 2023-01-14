using MediatR;
using SaM.AnyDeals.Application.Models.Responses;

namespace SaM.AnyDeals.Application.Requests.Adverts.Queries.Search;

public record SearchAdvertsQuery(
    string? Title, 
    string? Country, 
    string? City, 
    string? Category, 
    int? Goal, 
    int? Interest,
    int? Group,
    int From = 0,
    int Size = 25) 
    : IRequest<Response>;
