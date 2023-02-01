using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.Application.Common.Services.Interfaces;

public interface ICurrentUserService
{
    Task<ApplicationUser> GetCurrentUserAsync();
}
