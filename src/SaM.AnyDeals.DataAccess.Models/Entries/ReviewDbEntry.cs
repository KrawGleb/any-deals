using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class ReviewDbEntry : AuditableDbEntry
{
    public string? Title { get; set; }
    public string? Comment { get; set; }
    public int Grade { get; set; }

    public string? AuthorId { get; set; }
    public ApplicationUser? Author { get; set; }

    public int? AdvertId { get; set; }
    public AdvertDbEntry? Advert { get; set; }
}
