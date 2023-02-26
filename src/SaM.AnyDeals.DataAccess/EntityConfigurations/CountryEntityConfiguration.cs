using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.Common.Constraints;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class CountryEntityConfiguration : EntityConfigurationBase<CountryDbEntry>
{
    public override void ConfigureRelationships(EntityTypeBuilder<CountryDbEntry> builder)
    {
        builder
            .HasMany(c => c.Cities)
            .WithOne(c => c.Country)
            .OnDelete(DeleteBehavior.Cascade);
    }

    public override void ConfigureConstraints(EntityTypeBuilder<CountryDbEntry> builder)
    {
        builder
            .Property(c => c.Name)
            .HasMaxLength(CountryConstraints.NameMaxLength)
            .IsRequired();
    }
}