using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.DataAccess.Models.Entries;
using SaM.AnyDeals.DataAccess.Population.Helpers;

namespace SaM.AnyDeals.DataAccess.Population;

public static class CitiesPopulator
{
    public static List<CityDbEntry> Populate(this EntityTypeBuilder<CityDbEntry> builder, List<CountryDbEntry> countries)
    {
        var entries = new List<CityDbEntry>();
        var cityId = 1;

        foreach (var country in countries)
        {
            Console.WriteLine($"{country.Id} - {country.Name}");
            var cities = CitiesAndCountriesCsvLoader.GetCitiesByCountry(country.Name);
            entries.AddRange(cities.Select(city => new CityDbEntry() { Id = cityId++, Name = city, CountryId = country.Id }));
        }

        builder.HasData(entries);

        return entries.ToList();
    }
}
