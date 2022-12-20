using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace SaM.AnyDeals.DataAccess;

public static class DependencyInjection
{
    public static IServiceCollection AddDataAccess(this IServiceCollection services, IConfiguration configuration)
    {

        return services;
    }
}
