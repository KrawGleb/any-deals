
using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class CategoryDbEntry : DbEntryBase
{
    public string? Name { get; set; }
    public Status Status { get; set; }

    public List<AdvertDbEntry>? Adverts { get; set; }
}
