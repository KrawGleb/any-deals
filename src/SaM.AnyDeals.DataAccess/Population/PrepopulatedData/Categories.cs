using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Population.PrepopulatedData;

public static class Categories
{
    public static readonly List<CategoryDbEntry> List = new()
    {
        new CategoryDbEntry() { Id = 1, Name = "Household help" },
        new CategoryDbEntry() { Id = 2, Name = "Babysitting" },
        new CategoryDbEntry() { Id = 3, Name = "Repair" },
        new CategoryDbEntry() { Id = 4, Name = "Medical services" },
        new CategoryDbEntry() { Id = 5, Name = "Transportation" },
        new CategoryDbEntry() { Id = 6, Name = "Psychology" },
        new CategoryDbEntry() { Id = 7, Name = "Relocation" },
        new CategoryDbEntry() { Id = 8, Name = "Trainers" },
    };
}
