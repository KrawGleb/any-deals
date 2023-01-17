namespace SaM.AnyDeals.Application.Requests.Adverts.Queries.Get;

public class GetAdvertQuery : IRequest<Response>
{
    public int Id { get; set; }
}
