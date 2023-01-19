using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.Common.Enums.Adverts;
using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class AdvertDbEntry : DbEntryBase
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public Goal Goal { get; set; }
    public Group Group { get; set; }
    public Interest Interest { get; set; }
    public Status Status { get; set; }
    public DateTime CreatedAt { get; set; }

    public string? CreatorId { get; set; }
    public ApplicationUser? Creator { get; set; }

    public int CityId { get; set; }
    public CityDbEntry? City { get; set; }

    public int CategoryId { get; set; }
    public CategoryDbEntry? Category { get; set; }

    public int ContactsId { get; set; }
    public ContactsDbEntry? Contacts { get; set; }

    public List<AttachmentDbEntry>? Attachments { get; set; }
    public List<OrderDbEntry>? Orders { get; set; }
    public List<ReviewDbEntry>? Reviews { get; set; }
}
