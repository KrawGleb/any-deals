using Microsoft.AspNetCore.Identity;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Models.Identity;

public class ApplicationUser : IdentityUser
{
    public List<AdvertDbEntry>? Adverts { get; set; }
}
