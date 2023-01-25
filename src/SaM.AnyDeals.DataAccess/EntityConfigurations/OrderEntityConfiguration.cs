using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class OrderEntityConfiguration : EntityConfigurationBase<OrderDbEntry>
{
    public override void ConfigureRelationships(EntityTypeBuilder<OrderDbEntry> builder)
    {
        builder
            .HasOne(o => o.Chat)
            .WithOne(c => c.Order)
            .HasForeignKey<ChatDbEntry>(c => c.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
