using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Globalization;

namespace SaM.AnyDeals.API;

public static class Extensions
{
    public static void ConfigureAuthentication(this IServiceCollection services)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer("Bearer", options =>
        {
            var useProxy = false;
            _ = bool.TryParse(Environment.GetEnvironmentVariable("UseProxy"), out useProxy);

            options.Authority = useProxy
                ? "http://identity:80"
                : "https://localhost:5051";

            options.Audience = "AnyDealsAPI";
            options.RequireHttpsMetadata = false;
        });
    }
}
