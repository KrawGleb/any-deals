using AutoMapper;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Common.MappingProfiles;

public class CountryMappingProfile : Profile
{
    public CountryMappingProfile()
    {
        CreateMap<CountryDbEntry, CountryViewModel>();
    }
}
