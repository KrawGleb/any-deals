using MediatR;
using SaM.AnyDeals.Application.Models.Responses;

namespace SaM.AnyDeals.Application.Requests.Adverts.Queries.GetMy;

public record GetMyAdvertsQuery : IRequest<Response>;
