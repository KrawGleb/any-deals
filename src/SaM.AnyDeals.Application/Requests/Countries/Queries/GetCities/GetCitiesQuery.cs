using MediatR;
using SaM.AnyDeals.Application.Models.Responses;

namespace SaM.AnyDeals.Application.Requests.Countries.Queries.GetCities;

public record GetCitiesQuery(int CountryId) : IRequest<Response>;
