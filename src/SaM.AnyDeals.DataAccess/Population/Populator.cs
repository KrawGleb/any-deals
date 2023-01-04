using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Population;

public static class Populator
{
    public static void Populate(this ModelBuilder modelBuilder)
    {
        var populatedCountries = modelBuilder.Entity<CountryDbEntry>().Populate();
        modelBuilder.Entity<CityDbEntry>().Populate(populatedCountries);
    }
}
