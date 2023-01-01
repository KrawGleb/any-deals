using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.Common.Interfaces;
using SaM.AnyDeals.DataAccess.Implementations;

namespace SaM.AnyDeals.Infrastructure.Filters;

public class ProtectedAdvertsActionFilter : IAsyncActionFilter
{
    private readonly ApplicationDbContext _applicationDbContext;

    public ProtectedAdvertsActionFilter(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
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
        var advert = await _applicationDbContext.Adverts.FindAsync(advertId)
            ?? throw new NotFoundException($"Advert with id {advertId} not found.");

        var creatorId = advert.CreatorId;

        return userId == creatorId;
    }
}

