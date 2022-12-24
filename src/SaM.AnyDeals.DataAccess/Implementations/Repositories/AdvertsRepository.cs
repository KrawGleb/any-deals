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

        var entry = await query.FirstOrDefaultAsync(a => a.Id == id, cancellationToken)
            ?? throw new NotFoundException($"Entry with id {id} not found.");

        // TODO: use builder?
        await _context.Entry(entry)
            .Reference(e => e.Contacts)
            .LoadAsync(cancellationToken);

        await _context.Entry(entry)
            .Collection(e => e.Attachments!)
            .LoadAsync(cancellationToken);
        
        await _context.Entry(entry)
            .Reference(e => e.Category)
            .LoadAsync(cancellationToken);

        await _context.Entry(entry)
            .Reference(e => e.Creator)
            .LoadAsync(cancellationToken);

        return entry;
    }
}
