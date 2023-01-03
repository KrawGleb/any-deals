using AutoMapper;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Application.Requests.Adverts.Commands;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess.Implementations;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.MappingProfiles;

public class AdvertMappingProfile : Profile
{
    public AdvertMappingProfile()
    {

        CreateMap<AdvertDbEntry, AdvertViewModel>()
            .ForMember(d => d.Goal, s => s.MapFrom(e => e.Goal.GetEnumMemberValue()))
            .ForMember(d => d.Group, s => s.MapFrom(e => e.Group.GetEnumMemberValue()))
            .ForMember(d => d.Interest, s => s.MapFrom(e => e.Interest.GetEnumMemberValue()));

        CreateMap<CreateAdvertCommand, AdvertDbEntry>()
            .ForMember(e => e.City, c => c.Ignore())
            .ForMember(e => e.Category, c => c.Ignore());
    }
}
