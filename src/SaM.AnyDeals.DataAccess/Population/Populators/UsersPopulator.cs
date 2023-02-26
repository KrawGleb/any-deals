using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.DataAccess.Population.PrepopulatedData;

namespace SaM.AnyDeals.DataAccess.Population.Populators;

public static class UsersPopulator
{
    public static void Populate(this EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.HasData(Admin.Instance);
    }
}