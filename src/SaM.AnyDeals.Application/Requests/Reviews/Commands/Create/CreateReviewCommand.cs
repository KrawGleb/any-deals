namespace SaM.AnyDeals.Application.Requests.Reviews.Commands.Create;

public record CreateReviewCommand(
    string Title,
    string Comment,
    int Grade,
    int AdvertId) 
    : IRequest<Response>, IChangeDataRequest;
