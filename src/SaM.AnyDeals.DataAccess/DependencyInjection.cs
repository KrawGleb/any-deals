using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SaM.AnyDeals.DataAccess.Implementations;
using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.DataAccess;

public static class DependencyInjection
{
    public static IServiceCollection AddDataAccess(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionStringLabel = string.Empty;
        
        if (bool.TryParse(Environment.GetEnvironmentVariable("UseDockerDB"), out var useDockerDB))
            connectionStringLabel = useDockerDB ? "Docker" : "Local";
        else
            connectionStringLabel = "Local";

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString(connectionStringLabel),
                o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)));

        services.AddIdentity<ApplicationUser, IdentityRole>(options =>
        {
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequiredLength = 6;

            options.User.RequireUniqueEmail = true;
        })
            .AddEntityFrameworkStores<ApplicationDbContext>();

        return services;
    }
}
