using AutoMapper;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.Application.MappingProfiles;

public class ApplicationUserMappingProfile : Profile
{
	public ApplicationUserMappingProfile()
	{
		CreateMap<ApplicationUser, ApplicationUserViewModel>();
	}
}
