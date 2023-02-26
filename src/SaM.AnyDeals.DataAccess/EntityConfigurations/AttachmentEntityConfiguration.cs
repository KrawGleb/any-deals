using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.Common.Constraints;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class AttachmentEntityConfiguration : EntityConfigurationBase<AttachmentDbEntry>
{
    public override void ConfigureRelationships(EntityTypeBuilder<AttachmentDbEntry> builder)
    {
        builder
            .HasOne(a => a.Advert)
            .WithMany(a => a.Attachments);
    }

    public override void ConfigureConstraints(EntityTypeBuilder<AttachmentDbEntry> builder)
    {
        builder
            .Property(a => a.Link)
            .HasMaxLength(AttachmentConstraints.LinkMaxLength)
            .IsRequired();

        builder
            .Property(a => a.Name)
            .HasMaxLength(AttachmentConstraints.NameMaxLength);
    }
}