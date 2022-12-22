using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.Common.Constraints;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class AdvertEntityConfiguration : EntityConfigurationBase<AdvertDbEntry>
{
    public override void ConfigureRelationships(EntityTypeBuilder<AdvertDbEntry> builder)
    {
        builder
            .HasOne(a => a.Creator)
            .WithMany(c => c.Adverts)
            .HasForeignKey(a => a.CreatorId);

        builder
            .HasOne(a => a.City)
            .WithMany(c => c.Adverts)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(a => a.Category)
            .WithMany(c => c.Adverts)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(a => a.Contacts)
            .WithOne(c => c.Advert)
            .OnDelete(DeleteBehavior.Cascade)
            .HasForeignKey<ContactsDbEntry>(c => c.AdvertId);

        builder
            .HasMany(a => a.Attachments)
            .WithOne(a => a.Advert)
            .OnDelete(DeleteBehavior.Cascade);
    }

    public override void ConfigureConstraints(EntityTypeBuilder<AdvertDbEntry> builder)
    {
        builder
            .Property(a => a.Title)
            .HasMaxLength(AdvertConstraints.TitleMaxLength)
            .IsRequired();

        builder
            .Property(a => a.Decsription)
            .HasMaxLength(AdvertConstraints.DescriptionMaxLength)
            .IsRequired();
    }
}
