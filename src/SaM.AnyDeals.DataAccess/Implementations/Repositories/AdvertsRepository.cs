using SaM.AnyDeals.DataAccess.Interfaces.Repositories;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Implementations.Repositories;

public class AdvertsRepository : RepositoryBase<AdvertDbEntry>, IAdvertsRepository
{
    public AdvertsRepository(ApplicationDbContext context) 
        : base(context)
    { }
}
