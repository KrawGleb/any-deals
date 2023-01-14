using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.DataAccess.Models.Elastic;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Helpers;

public static class AdvertsHelper
{
    public static AdvertElasticEntry MapDbEntry(AdvertDbEntry advert)
        => new()
        {
            Id = advert.Id,
            Title = advert.Title,
            Country = advert.City?.Country?.Name,
            Goal = (int)advert.Goal,
            Interest = (int)advert.Interest,
            Group = (int)advert.Group,
            Category = advert.Category?.Name,
            City = advert.City?.Name,
            Creator = advert.Contacts?.Name,
            PreviewUrl = advert.Attachments?.FirstOrDefault(a => a.Type == AttachmentType.Image)?.Link
        };
}
