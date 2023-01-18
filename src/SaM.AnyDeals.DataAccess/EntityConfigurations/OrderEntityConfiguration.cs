using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class OrderEntityConfiguration : EntityConfigurationBase<OrderDbEntry>
{
    public override void ConfigureRelationships(EntityTypeBuilder<OrderDbEntry> builder)
    {
        builder
            .HasOne(o => o.Advert)
            .WithMany(a => a.Orders)
            .OnDelete(DeleteBehavior.NoAction)
            .IsRequired(true);

        builder
            .HasOne(o => o.Customer)
            .WithMany(c => c.Orders)
            .OnDelete(DeleteBehavior.NoAction)
            .IsRequired(true);

        builder
            .HasOne(o => o.Executor)
            .WithMany(c => c.Execution)
            .OnDelete(DeleteBehavior.NoAction)
            .IsRequired(true);
    }
}
