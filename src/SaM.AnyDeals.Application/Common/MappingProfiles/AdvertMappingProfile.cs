using AutoMapper;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Application.Requests.Adverts.Commands.Create;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Common.MappingProfiles;

public class AdvertMappingProfile : Profile
{
    public AdvertMappingProfile()
    {
        CreateMap<AdvertDbEntry, AdvertViewModel>();
        CreateMap<CreateAdvertCommand, AdvertDbEntry>();
    }
}
