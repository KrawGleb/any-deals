using SaM.AnyDeals.DataAccess.Models.Enums;
using SaM.AnyDeals.DataAccess.Models.Identity;

namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class AdvertDbEntry : DbEntryBase
{
    public string? Title { get; set; }
    public string? Decsription { get; set; }
    public AdvertType Type { get; set; }
    public bool IsCommertial { get; set; }
    public bool IsOffline { get; set; }

    public int CreatorId { get; set; }
    public ApplicationUser? Creator { get; set; }

    public int CityId { get; set; }
    public CityDbEntry? City { get; set; }

    public int CategoryId { get; set; }
    public CategoryDbEntry? Category { get; set; }

    public int ContactsId { get; set; }
    public ContactsDbEntry? Contacts { get; set; }

    public List<AttachmentDbEntry>? Attachments { get; set; }
}
