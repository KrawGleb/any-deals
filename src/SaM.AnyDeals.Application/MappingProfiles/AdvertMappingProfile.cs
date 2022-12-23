using AutoMapper;
using SaM.AnyDeals.Application.Requests.Adverts.Commands;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.MappingProfiles;

public class AdvertMappingProfile : Profile
{
	public AdvertMappingProfile()
	{
		CreateMap<CreateAdvertCommand, AdvertDbEntry>();
	}
}
