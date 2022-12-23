using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Interfaces.Repositories;

public interface IRepositoryBase<T>
    where T: DbEntryBase, new()
{
    Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default);
    Task<T> CreateAsync(T entity, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task DeleteAsync(T entity, CancellationToken cancellationToken = default);
    Task<IEnumerable<T>> GetAllAsync(bool trackEntities = false, CancellationToken cancellationToken = default);
    Task<T?> GetByIdAsync(int id, bool trackEntity = false, CancellationToken cancellationToken = default);
}
