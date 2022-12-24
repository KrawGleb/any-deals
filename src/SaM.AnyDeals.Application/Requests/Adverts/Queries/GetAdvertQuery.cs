using MediatR;
using SaM.AnyDeals.Application.Models.Responses;

namespace SaM.AnyDeals.Application.Requests.Adverts.Queries;

public class GetAdvertQuery : IRequest<Response>
{
    public int Id { get; set; }
}
