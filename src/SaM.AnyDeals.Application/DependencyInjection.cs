using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using SaM.AnyDeals.Application.Common.Behaviors;
using SaM.AnyDeals.Application.Models.Configurations;
using System.Reflection;

namespace SaM.AnyDeals.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();

        services.AddValidatorsFromAssembly(assembly);
        services.AddMediatR(assembly);
        services.AddAutoMapper(assembly);

        services.Configure<JWTConfiguration>(instance
            => instance.Key = Environment.GetEnvironmentVariable("JWTSecurityKey"));

        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        return services;
    }
}
