using MediatR;
using SaM.AnyDeals.Application.Models.Responses;

namespace SaM.AnyDeals.Application.Requests.Categories.Queries.Get;

public record GetCategoriesQuery : IRequest<Response>;
