using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess.Interfaces.Repositories;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Implementations.Repositories;

public class AdvertsRepository : RepositoryBase<AdvertDbEntry>, IAdvertsRepository
{
    public AdvertsRepository(ApplicationDbContext context) 
        : base(context)
    { }

    public override async Task<AdvertDbEntry?> GetByIdAsync(int id, bool trackEntity = false, CancellationToken cancellationToken = default)
    {
        var query = trackEntity
            ? _table
            : _table.AsNoTracking();

        query = query
            .Include(e => e.Contacts)
            .Include(e => e.Attachments)
            .Include(e => e.Category)
            .Include(e => e.Creator)
            .Include(e => e.City)
                .ThenInclude(c => c!.Country);

        var entry = await query.FirstOrDefaultAsync(a => a.Id == id, cancellationToken)
            ?? throw new NotFoundException($"Entry with id {id} not found.");

        return entry;
    }

    public async Task<string> GetAdvertCreatorIdAsync(int id)
    {
        var advert = await _table.FirstOrDefaultAsync(a => a.Id == id)
            ?? throw new NotFoundException($"Advert with id {id} not found.");
        return advert.CreatorId;
    } 
}
