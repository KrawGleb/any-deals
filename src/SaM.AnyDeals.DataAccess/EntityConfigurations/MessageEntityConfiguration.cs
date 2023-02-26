using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.Common.Constraints;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class MessageEntityConfiguration : EntityConfigurationBase<MessageDbEntry>
{
    public override void ConfigureConstraints(EntityTypeBuilder<MessageDbEntry> builder)
    {
        builder
            .Property(m => m.Text)
            .HasMaxLength(MessageConstraints.TextMaxLength)
            .IsRequired();
    }
}