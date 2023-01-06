using MediatR;
using SaM.AnyDeals.Application.Models.Responses;

namespace SaM.AnyDeals.Application.Requests.Countries.Queries.Get;

public record GetCountriesQuery() : IRequest<Response>;
