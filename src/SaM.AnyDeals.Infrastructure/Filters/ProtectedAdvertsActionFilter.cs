using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SaM.AnyDeals.Common.Enums.Auth;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.Common.Interfaces;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Auth;
using System.Security.Claims;

namespace SaM.AnyDeals.Infrastructure.Filters;

public class ProtectedAdvertsActionFilter : IAsyncActionFilter
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly UserManager<ApplicationUser> _userManager;
    public ProtectedAdvertsActionFilter(
        ApplicationDbContext applicationDbContext,
        UserManager<ApplicationUser> userManager)
    {
        _applicationDbContext = applicationDbContext;
        _userManager = userManager;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var allowExecute = false;

        var request = context
            .ActionArguments
            .Values
            .FirstOrDefault(v => v is IProtectedAdvertAction) as IProtectedAdvertAction;

        if (request is not null)
        {
            var id = request.Id;
            allowExecute = await AllowUserEditAdvert(context.HttpContext.User, id);
        }

        if (allowExecute)
            await next();
        else
            context.Result = new ForbidResult();
    }

    private async Task<bool> AllowUserEditAdvert(ClaimsPrincipal userClaim, int advertId)
    {
        var user = await _userManager.GetUserAsync(userClaim)
            ?? throw new NotFoundException($"User with not found.");
        var advert = await _applicationDbContext.Adverts.FindAsync(advertId)
            ?? throw new NotFoundException($"Advert with id {advertId} not found.");

        var creatorId = advert.CreatorId;

        return 
            user.Id == creatorId ||
            await _userManager.IsInRoleAsync(user, RolesEnum.Admin);
    }
}

