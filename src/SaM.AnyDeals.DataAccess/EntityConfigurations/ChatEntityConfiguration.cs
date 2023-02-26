using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class ChatEntityConfiguration : EntityConfigurationBase<ChatDbEntry>
{
    public override void ConfigureRelationships(EntityTypeBuilder<ChatDbEntry> builder)
    {
        builder
            .HasMany(c => c.Messages)
            .WithOne(m => m.Chat)
            .OnDelete(DeleteBehavior.Cascade);
    }
}