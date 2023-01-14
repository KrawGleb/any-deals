using AutoMapper;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Application.Requests.Adverts.Commands.Create;
using SaM.AnyDeals.Application.Requests.Adverts.Queries.Search;
using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.Common.Models;
using SaM.AnyDeals.DataAccess.Models.Elastic;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Common.MappingProfiles;

public class AdvertMappingProfile : Profile
{
    public AdvertMappingProfile()
    {
        CreateMap<AdvertDbEntry, AdvertViewModel>();
        CreateMap<CreateAdvertCommand, AdvertDbEntry>();

        CreateMap<SearchAdvertsQuery, SearchAdvertsParams>();

        CreateMap<AdvertElasticEntry, AdvertViewModel>()
            .ForMember(
                d => d.City, 
                s => s.MapFrom(r => new CityViewModel { Name = r.City, Country = new CountryViewModel { Name = r.Country } }))
            .ForMember(
                d => d.Category, 
                s => s.MapFrom(r => new CategoryViewModel { Name = r.Category }))
            .ForMember(
                d => d.Attachments, 
                s => s.MapFrom(r => new List<AttachmentViewModel> { new AttachmentViewModel { Link = r.PreviewUrl, Type = AttachmentType.Image } }))
            .ForMember(
                d => d.Contacts, 
                s => s.MapFrom(r => new ContactsViewModel { Name = r.Creator }))
            .ForMember(
                d => d.Creator, 
                s => s.MapFrom(r => new ApplicationUserViewModel { UserName = r.Creator}));
    }
}
