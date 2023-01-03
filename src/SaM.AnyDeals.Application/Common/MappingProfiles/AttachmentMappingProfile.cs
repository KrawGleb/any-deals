using AutoMapper;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Common.MappingProfiles;

public class AttachmentMappingProfile : Profile
{
    public AttachmentMappingProfile()
    {
        CreateMap<AttachmentDbEntry, AttachmentViewModel>()
            .ReverseMap();
    }
}
