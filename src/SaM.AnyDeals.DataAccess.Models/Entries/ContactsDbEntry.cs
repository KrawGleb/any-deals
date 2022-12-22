namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class ContactsDbEntry : DbEntryBase
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? Facebook { get; set; }
    public string? VK { get; set; }
    public string? Instagram { get; set; }
    public string? LinkedIn { get; set; }
    public string? Telegram { get; set; }
    public string? WhatsApp { get; set; }

    public int AdvertId { get; set; }
    public AdvertDbEntry? Advert { get; set; }
}
