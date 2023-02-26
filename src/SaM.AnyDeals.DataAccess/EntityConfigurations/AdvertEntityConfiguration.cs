using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.Common.Constraints;
using SaM.AnyDeals.Common.Enums;
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

        builder
            .HasMany(a => a.Orders)
            .WithOne(o => o.Advert)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasMany(a => a.Reviews)
            .WithOne(r => r.Advert)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .Property(a => a.Price)
            .HasPrecision(8, 2);
    }

    public override void ConfigureConstraints(EntityTypeBuilder<AdvertDbEntry> builder)
    {
        builder
            .Property(a => a.Title)
            .HasMaxLength(AdvertConstraints.TitleMaxLength)
            .IsRequired();

        builder
            .Property(a => a.Description)
            .HasMaxLength(AdvertConstraints.DescriptionMaxLength)
            .IsRequired();

        builder
            .Property(a => a.Status)
            .HasDefaultValue(Status.Draft);
    }
}