using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.Common.Interfaces;
using SaM.AnyDeals.DataAccess.Interfaces.Repositories;
using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.Infrastructure.Filters;

public class ProtectedAdvertsActionFilter : IAsyncActionFilter
{
    private readonly IAdvertsRepository _advertsRepository;

    public ProtectedAdvertsActionFilter(IAdvertsRepository advertsRepository)
    {
        _advertsRepository = advertsRepository;
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
            var userId = context.HttpContext.GetUserId();

            allowExecute = await AllowUserEditAdvert(userId, id);
        }

        if (allowExecute)
            await next();
        else
            context.Result = new ForbidResult();
    }

    private async Task<bool> AllowUserEditAdvert(string userId, int advertId)
    {
        var creatorId = await _advertsRepository.GetAdvertCreatorIdAsync(advertId);

        return userId == creatorId;
    }
}

