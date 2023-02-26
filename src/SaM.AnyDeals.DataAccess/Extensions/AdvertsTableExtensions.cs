using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Extensions;

public static class AdvertsTableExtensions
{
    public static IQueryable<AdvertDbEntry> FullInclude(this IQueryable<AdvertDbEntry> table)
    {
        return table
            .Include(a => a.Contacts)
            .Include(a => a.Creator)
            .Include(a => a.City)
            .ThenInclude(c => c!.Country)
            .Include(a => a.Category)
            .Include(a => a.Attachments);
    }
}