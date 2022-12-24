using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Interfaces.Repositories;

public interface IAdvertsRepository : IRepositoryBase<AdvertDbEntry>
{
    Task<string> GetAdvertCreatorIdAsync(int id);
}
