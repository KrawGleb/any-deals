using Nest;
using SaM.AnyDeals.Common.Models;
using SaM.AnyDeals.DataAccess.Models.Elastic;

namespace SaM.AnyDeals.DataAccess.Services.Interfaces;

public interface IElasticService
{
    Task<IndexResponse> IndexAdvertAsync(AdvertElasticEntry advert, CancellationToken cancellationToken = default);
    Task<UpdateResponse<AdvertElasticEntry>> UpdateAdvertAsync(AdvertElasticEntry advert, CancellationToken cancellationToken = default);
    Task<DeleteResponse> DeleteAdvertAsync(AdvertElasticEntry advert, CancellationToken cancellactionToken = default);

    Task<IEnumerable<AdvertElasticEntry>> SearchAdvertsAsync(SearchAdvertsParams searchParams, CancellationToken cancellationToken = default);
}
