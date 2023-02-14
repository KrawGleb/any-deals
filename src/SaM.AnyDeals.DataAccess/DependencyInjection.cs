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
using System.Text;

namespace SaM.AnyDeals.DataAccess;

public static class DependencyInjection
{
    public static IServiceCollection AddDataAccess(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddElastic();

        var connectionString = string.Empty;

        _ = bool.TryParse(Environment.GetEnvironmentVariable("UseDockerDB"), out var useInDockerDB);
        if (useInDockerDB)
            connectionString = Environment.GetEnvironmentVariable("ConnectionString");        
        else
            connectionString = configuration.GetConnectionString("Local");

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                connectionString,
                o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)));

        services.AddIdentity<ApplicationUser, IdentityRole>(options =>
        {
            var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var ruAlphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
            var numbers = "1234567890";
            var sb = new StringBuilder();
            sb.Append(alphabet.ToUpper());
            sb.Append(alphabet.ToLower());
            sb.Append(ruAlphabet.ToUpper());
            sb.Append(ruAlphabet.ToLower());
            sb.Append(numbers);
            sb.Append("_ ");

            options.Password.RequiredLength = 6;
            options.Password.RequireDigit = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;

            options.User.AllowedUserNameCharacters = sb.ToString();
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
