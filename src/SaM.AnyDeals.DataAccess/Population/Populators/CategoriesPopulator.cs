using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaM.AnyDeals.DataAccess.Models.Entries;
using SaM.AnyDeals.DataAccess.Population.PrepopulatedData;

namespace SaM.AnyDeals.DataAccess.Population.Populators;

public static class CategoriesPopulator
{
    public static List<CategoryDbEntry> Populate(this EntityTypeBuilder<CategoryDbEntry> builder)
    {
        var categories = Categories.List;

        builder.HasData(categories);

        return categories;
    }
}