using Microsoft.Extensions.DependencyInjection;
using SaM.AnyDeals.Infrastructure.Filters;

namespace SaM.AnyDeals.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<ProtectedAdvertsActionFilter>();

        return services;
    }
}