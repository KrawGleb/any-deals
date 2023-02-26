namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class CityDbEntry : DbEntryBase
{
    public string? Name { get; set; }

    public int CountryId { get; set; }
    public CountryDbEntry? Country { get; set; }

    public List<AdvertDbEntry>? Adverts { get; set; }
}