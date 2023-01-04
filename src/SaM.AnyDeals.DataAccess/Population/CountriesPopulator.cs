using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.DataAccess.Models.Entries;
using SaM.AnyDeals.DataAccess.Population.Helpers;

namespace SaM.AnyDeals.DataAccess.Population;

public static class CountriesPopulator
{
    public static List<CountryDbEntry> Populate(this EntityTypeBuilder<CountryDbEntry> builder)
    {
        var countries = CitiesAndCountriesCsvLoader.GetCountries();
        var countryId = 1;
        
        var entries = countries.Select(country => new CountryDbEntry()
        {
            Id = countryId++,
            Name = country,
        }).ToList();

        builder.HasData(entries);

        return entries;
    }
}
