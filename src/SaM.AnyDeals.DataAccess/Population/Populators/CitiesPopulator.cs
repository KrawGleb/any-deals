using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.DataAccess.Models.Entries;
using SaM.AnyDeals.DataAccess.Population.Helpers;

namespace SaM.AnyDeals.DataAccess.Population.Populators;

public static class CitiesPopulator
{
    public static List<CityDbEntry> Populate(this EntityTypeBuilder<CityDbEntry> builder, List<CountryDbEntry> countries)
    {
        var entries = new List<CityDbEntry>();

        foreach (var country in countries)
        {
            var cities = CitiesAndCountriesCsvLoader.GetCitiesByCountry(country.Name!);
            entries.AddRange(cities.Select(record => new CityDbEntry()
            {
                Id = record.Id,
                CountryId = country.Id,
                Name = record.CityAscii,
            }));
        }

        builder.HasData(entries);

        return entries;
    }
}
