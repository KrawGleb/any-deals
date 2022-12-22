using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.Common.Constraints;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class CategoryEntityConfiguration : EntityConfigurationBase<CategoryDbEntry>
{
    public override void ConfigureRelationships(EntityTypeBuilder<CategoryDbEntry> builder)
    {
        builder
            .HasMany(c => c.Adverts)
            .WithOne(a => a.Category);
    }

    public override void ConfigureConstraints(EntityTypeBuilder<CategoryDbEntry> builder)
    {
        builder
            .Property(c => c.Name)
            .HasMaxLength(CategoryConstraints.NameMaxLength)
            .IsRequired();
    }
}
