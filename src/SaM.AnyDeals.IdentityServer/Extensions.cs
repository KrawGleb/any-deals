using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.IdentityServer.Services;

namespace SaM.AnyDeals.IdentityServer;

public static class Extensions
{
    public static void ConfigureIdentityServer(this IServiceCollection services)
    {
        services.AddIdentityServer(options =>
        {
            _ = bool.TryParse(Environment.GetEnvironmentVariable("UseProxy"), out var useProxy);
            if (useProxy)
                options.IssuerUri = "http://localhost:80/identity";

            options.Events.RaiseErrorEvents = true;
            options.Events.RaiseInformationEvents = true;
            options.Events.RaiseFailureEvents = true;
            options.Events.RaiseSuccessEvents = true;

            options.EmitStaticAudienceClaim = true;
        })
        .AddProfileService<ProfileService>()
        .AddAspNetIdentity<ApplicationUser>()
        .AddInMemoryApiResources(Config.ApiResources)
        .AddInMemoryIdentityResources(Config.IdentityResources)
        .AddInMemoryApiScopes(Config.ApiScopes)
        .AddInMemoryClients(Config.Clients)
        .AddDeveloperSigningCredential();

        // TODO: Hide secret
        services.AddAuthentication()
            .AddGoogle(googleOptions =>
        {
            googleOptions.ClientId = "386854459789-73p4cs9kmjfn09egcmv9r5inq86jso1j.apps.googleusercontent.com";
            googleOptions.ClientSecret = "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";
        });
    }

    public static void ConfigureCookies(this IServiceCollection services)
    {
        services.Configure<CookiePolicyOptions>(options =>
        {
            options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
            options.OnAppendCookie = (cookieContext)
                => cookieContext.CookieOptions.SameSite = SameSiteMode.Unspecified;
            options.OnDeleteCookie = (cookieContext)
                => cookieContext.CookieOptions.SameSite = SameSiteMode.Unspecified;
        });

        services.ConfigureApplicationCookie(config =>
        {
            config.Cookie.Name = "SaM.AnyDeals.Identity.Cookie";
            config.Cookie.SameSite = SameSiteMode.Unspecified;
            config.LoginPath = "/Auth/Login";
            config.LogoutPath = "/Auth/Logout";
        });
    }
}
