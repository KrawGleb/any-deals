using MediatR;
using Microsoft.Extensions.DependencyInjection;
using SaM.AnyDeals.Application.Models.Configurations;
using System.Reflection;

namespace SaM.AnyDeals.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();

        services.AddMediatR(assembly);
        services.AddAutoMapper(assembly);

        services.Configure<JWTConfiguration>(instance 
            => instance.Key = Environment.GetEnvironmentVariable("JWTSecurityKey"));

        return services;
    }
}
