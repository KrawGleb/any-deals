using Microsoft.Extensions.Logging;
using Nest;
using SaM.AnyDeals.Common.Constants;
using SaM.AnyDeals.DataAccess.Models.Elastic;
using SaM.AnyDeals.DataAccess.Services.Interfaces;

namespace SaM.AnyDeals.DataAccess.Services;

public class ElasticService : IElasticService
{
    private readonly IElasticClient _elasticClient;
    private readonly ILogger<ElasticService> _logger;

    public ElasticService(
        IElasticClient elasticClient,
        ILogger<ElasticService> logger)
    {
        _elasticClient = elasticClient;
        _logger = logger;
    }

    public async Task<IndexResponse> IndexAdvertAsync(AdvertElasticEntry advert, CancellationToken cancellationToken = default)
    {
        var response = await _elasticClient
             .IndexAsync(
                 advert, x => x.Index(ElasticConstants.IndexName), cancellationToken);

        LogResponse(response);

        return response;
    }
    public async Task<UpdateResponse<AdvertElasticEntry>> UpdateAdvertAsync(AdvertElasticEntry advert, CancellationToken cancellationToken = default)
    {
        var response = await _elasticClient
                .UpdateAsync<AdvertElasticEntry>(
                    advert.Id, u => u.Index(ElasticConstants.IndexName).Doc(advert), cancellationToken);

        LogResponse(response);

        return response;
    }

    public async Task<DeleteResponse> DeleteAdvertAsync(AdvertElasticEntry advert, CancellationToken cancellationToken = default)
    {
        var response = await _elasticClient.DeleteAsync<AdvertElasticEntry>(advert.Id.ToString(), ct: cancellationToken);

        LogResponse(response);

        return response;
    }

    private void LogResponse(WriteResponseBase response)
    {
        if (response.IsValid)
            _logger.LogInformation(response.DebugInformation);
        else
            _logger.LogError(response.DebugInformation);
    }
}
