using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.Common.Constraints;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.EntityConfigurations;

public class ReviewEntityConfiguration : EntityConfigurationBase<ReviewDbEntry>
{
    public override void ConfigureConstraints(EntityTypeBuilder<ReviewDbEntry> builder)
    {
        builder
            .Property(r => r.Title)
            .HasMaxLength(ReviewConstraints.TitleMaxLength)
            .IsRequired();

        builder
            .Property(r => r.Comment)
            .HasMaxLength(ReviewConstraints.CommentMaxLength)
            .IsRequired(false);
    }
}