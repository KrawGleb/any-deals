using SaM.AnyDeals.Application.Models.Common;
using SaM.AnyDeals.Application.Models.ViewModels;

namespace SaM.AnyDeals.Application.Requests.Users.Queries.GetDetails;

public class GetUserDetailsResponse : Response
{
    public ApplicationUserViewModel? User { get; set; }
    public List<AverageRatingDescription>? AverageRatingDescriptions { get; set; }
    public List<AdvertViewModel>? Adverts { get; set; }
}
