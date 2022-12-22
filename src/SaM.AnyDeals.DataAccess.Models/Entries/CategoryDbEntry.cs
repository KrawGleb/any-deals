namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class CategoryDbEntry : DbEntryBase
{
    public string? Name { get; set; }

    public List<AdvertDbEntry>? Adverts { get; set; }
}
