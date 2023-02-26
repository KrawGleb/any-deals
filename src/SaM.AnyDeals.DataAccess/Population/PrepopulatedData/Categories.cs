using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Population.PrepopulatedData;

public static class Categories
{
    public static readonly List<CategoryDbEntry> List = new()
    {
        new CategoryDbEntry { Id = 1, Name = "Household help", Status = Status.Accepted },
        new CategoryDbEntry { Id = 2, Name = "Babysitting", Status = Status.Accepted },
        new CategoryDbEntry { Id = 3, Name = "Repair", Status = Status.Accepted },
        new CategoryDbEntry { Id = 4, Name = "Medical services", Status = Status.Accepted },
        new CategoryDbEntry { Id = 5, Name = "Transportation", Status = Status.Accepted },
        new CategoryDbEntry { Id = 6, Name = "Psychology", Status = Status.Accepted },
        new CategoryDbEntry { Id = 7, Name = "Relocation", Status = Status.Accepted },
        new CategoryDbEntry { Id = 8, Name = "Trainers", Status = Status.Accepted }
    };
}