using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;

namespace SaM.AnyDeals.Common.Extensions;

public static class HttpContextExtension
{
    public static string GetUserId(this HttpContext context)
    {
        var userId = context?.User.Claims.SingleOrDefault(c => c.Type == "id")?.Value;
        return userId ?? string.Empty;
    }
}
