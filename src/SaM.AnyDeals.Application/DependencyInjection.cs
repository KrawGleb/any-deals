using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using SaM.AnyDeals.Application.Common.Behaviors;
using SaM.AnyDeals.Application.Common.Services;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using Stripe;
using System.Reflection;

namespace SaM.AnyDeals.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        StripeConfiguration.ApiKey = "sk_test_51MdbzTK1quWD7yVfOXINNNhUyDpKl3rvxXq3eNiWDypaWzahmOtC9vBQnmXqYKWSsIpoMBoLiKMY7ULjhk3uWTCl00l8hpr8Il";

        var assembly = Assembly.GetExecutingAssembly();

        services.AddValidatorsFromAssembly(assembly);
        services.AddMediatR(assembly);
        services.AddAutoMapper(assembly);

        services.AddTransient<ICurrentUserService, CurrentUserService>();
        services.AddTransient<IPaymentService, PaymentService>();
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        return services;
    }
}
