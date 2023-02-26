using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.Common.Enums.Auth;
using SaM.AnyDeals.DataAccess.Population.PrepopulatedData;

namespace SaM.AnyDeals.DataAccess.Population.Populators;

public static class UserRolesPopulator
{
    public static void Populate(this EntityTypeBuilder<IdentityUserRole<string>> builder)
    {
        builder
            .HasData(new IdentityUserRole<string>
            {
                UserId = Admin.Instance.Id,
                RoleId = RolesEnum.AdminRole.Id
            });
    }
}