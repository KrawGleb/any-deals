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
        modelBuilder.Entity<CategoryDbEntry>().Populate();

        modelBuilder.Entity<IdentityRole>().Populate();
        modelBuilder.Entity<ApplicationUser>().Populate();
        modelBuilder.Entity<IdentityUserRole<string>>().Populate();
    }
}