namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class CountryDbEntry : DbEntryBase
{
    public string? Name { get; set; }

    public List<CityDbEntry>? Cities { get; set; }
}