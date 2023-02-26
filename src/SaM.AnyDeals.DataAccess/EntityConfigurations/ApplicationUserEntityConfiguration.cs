using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class ApplicationUserEntityConfiguration : EntityConfigurationBase<ApplicationUser>
{
    public override void ConfigureRelationships(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder
            .HasMany(u => u.Adverts)
            .WithOne(a => a.Creator)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(u => u.Orders)
            .WithOne(a => a.Customer)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasMany(u => u.Execution)
            .WithOne(a => a.Executor)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(a => a.Reviews)
            .WithOne(r => r.Author)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasMany(a => a.Messages)
            .WithOne(m => m.Sender)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .Property(a => a.Balance)
            .HasPrecision(8, 2);
    }
}