using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nest;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.DataAccess.Services.Interfaces;
using SaM.AnyDeals.DataAccess.Services;
using SaM.AnyDeals.DataAccess.Models.Elastic;
using SaM.AnyDeals.Common.Constants;

namespace SaM.AnyDeals.DataAccess;

public static class DependencyInjection
{
    public static IServiceCollection AddDataAccess(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddElastic();

        var connectionStringLabel = string.Empty;

        var useDockerDB = false;
        _ = bool.TryParse(Environment.GetEnvironmentVariable("UseDockerDB"), out useDockerDB);
        
        if(useDockerDB)
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
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        return services;
    }

    private static void AddElastic(this IServiceCollection services)
    {
        services.AddSingleton<IElasticClient>(factory =>
        {
            var connectionUri = new Uri(Environment.GetEnvironmentVariable("BONSAI_URL")!);

            var settings = new ConnectionSettings(connectionUri)
                .DefaultMappingFor<AdvertElasticEntry>(i => i.IndexName(ElasticConstants.IndexName))
                .EnableHttpCompression()
                .ConnectionLimit(-1)
                .DisableDirectStreaming();

            var client = new ElasticClient(settings);

            var response = client.Indices.Create(
                ElasticConstants.IndexName,
                index => index.Map<AdvertElasticEntry>(x => x.AutoMap()));

            return client;

        });

        services.AddScoped<IElasticService, ElasticService>();
    }
}
