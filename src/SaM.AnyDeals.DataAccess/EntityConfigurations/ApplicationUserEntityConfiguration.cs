using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.DataAccess.Models.Identity;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class ApplicationUserEntityConfiguration : EntityConfigurationBase<ApplicationUser>
{
    public override void ConfigureRelationships(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder
            .HasMany(u => u.Adverts)
            .WithOne(a => a.Creator)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
