using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.Common.Constraints;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class CityEntityConfiguration : EntityConfigurationBase<CityDbEntry>
{
    public override void ConfigureRelationships(EntityTypeBuilder<CityDbEntry> builder)
    {
        builder
            .HasOne(c => c.Country)
            .WithMany(c => c.Cities);
    }

    public override void ConfigureConstraints(EntityTypeBuilder<CityDbEntry> builder)
    {
        builder
            .Property(c => c.Name)
            .HasMaxLength(CityConstraints.NameMaxLength)
            .IsRequired();
    }
}
