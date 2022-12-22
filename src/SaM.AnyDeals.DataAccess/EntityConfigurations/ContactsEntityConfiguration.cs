using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.Common.Constraints;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class ContactsEntityConfiguration : EntityConfigurationBase<ContactsDbEntry>
{
    public override void ConfigureRelationships(EntityTypeBuilder<ContactsDbEntry> builder)
    {
        builder
            .HasOne(c => c.Advert)
            .WithOne(a => a.Contacts)
            .HasForeignKey<AdvertDbEntry>(a => a.ContactsId);
    }

    public override void ConfigureConstraints(EntityTypeBuilder<ContactsDbEntry> builder)
    {
        builder
            .Property(c => c.Address)
            .HasMaxLength(ContactsConstraints.AddressMaxLength)
            .IsRequired(false);

        builder
            .Property(c => c.Instagram)
            .HasMaxLength(ContactsConstraints.InstagramMaxLength)
            .IsRequired(false);

        builder
            .Property(c => c.Name)
            .HasMaxLength(ContactsConstraints.NameMaxLength)
            .IsRequired();

        builder
            .Property(c => c.Phone)
            .HasMaxLength(ContactsConstraints.PhoneMaxLength)
            .IsRequired(false);

        builder
            .Property(c => c.Email)
            .HasMaxLength(ContactsConstraints.EmailMaxLength)
            .IsRequired(false);

        builder
            .Property(c => c.WhatsApp)
            .HasMaxLength(ContactsConstraints.WhatsAppMaxLength)
            .IsRequired(false);

        builder
            .Property(c => c.Facebook)
            .HasMaxLength(ContactsConstraints.FacebookMaxLength)
            .IsRequired(false);

        builder
            .Property(c => c.LinkedIn)
            .HasMaxLength(ContactsConstraints.LinkedInMaxLength)
            .IsRequired(false);

        builder
            .Property(c => c.VK)
            .HasMaxLength(ContactsConstraints.VkMaxLength)
            .IsRequired(false);

        builder
            .Property(c => c.Telegram)
            .HasMaxLength(ContactsConstraints.TelegramMaxLength)
            .IsRequired(false);
    }
}
