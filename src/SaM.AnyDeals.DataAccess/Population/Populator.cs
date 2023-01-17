using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.DataAccess.Models.Entries;
using SaM.AnyDeals.DataAccess.Population.Populators;

namespace SaM.AnyDeals.DataAccess.Population;

public static class Populator
{
    public static void Populate(this ModelBuilder modelBuilder)
    {
        var populatedCountries = modelBuilder.Entity<CountryDbEntry>().Populate();
        modelBuilder.Entity<CityDbEntry>().Populate(populatedCountries);
        modelBuilder.Entity<CategoryDbEntry>().Populate();

        modelBuilder.Entity<IdentityRole>().Populate();
        modelBuilder.Entity<ApplicationUser>().Populate();
        modelBuilder.Entity<IdentityUserRole<string>>().Populate();
    }
}
