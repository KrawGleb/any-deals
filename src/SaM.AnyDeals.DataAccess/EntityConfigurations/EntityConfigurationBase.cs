using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public abstract class EntityConfigurationBase<T> 
    : IEntityTypeConfiguration<T> where T : class
{
    public void Configure(EntityTypeBuilder<T> builder)
    {
        ConfigureRelationships(builder);
        ConfigureConstraints(builder);
    }

    public virtual void ConfigureRelationships(EntityTypeBuilder<T> builder) { }

    public virtual void ConfigureConstraints(EntityTypeBuilder<T> builder) { }
}
