using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.Common.Enums.Auth;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Population.Populators;

public static class RolesPopulator
{
    public static void Populate(this EntityTypeBuilder<IdentityRole> builder)
    {
        builder.HasData(RolesEnum.Roles);
    }
}
