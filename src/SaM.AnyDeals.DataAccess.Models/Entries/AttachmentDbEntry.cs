namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class AttachmentDbEntry : DbEntryBase
{
    public string? Link { get; set; }

    public int AdvertId { get; set; }
    public AdvertDbEntry? Advert { get; set; }
}
