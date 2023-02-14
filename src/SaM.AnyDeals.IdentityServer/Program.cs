using IdentityServer4;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.HttpOverrides;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.IdentityServer;
using SaM.AnyDeals.IdentityServer.Services;
using SaM.AnyDeals.IdentityServer.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDataAccess(builder.Configuration);
builder.Services.AddTransient<IAuthService, AuthService>();

builder.Services
    .AddIdentityServer(options =>
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

builder.Services.AddAuthentication().AddGoogle(googleOptions =>
{
    googleOptions.ClientId = "386854459789-73p4cs9kmjfn09egcmv9r5inq86jso1j.apps.googleusercontent.com";
    googleOptions.ClientSecret = "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";
});

builder.Services.AddScoped<IProfileService, ProfileService>();

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
    options.OnAppendCookie = (cookieContext)
        => cookieContext.CookieOptions.SameSite = SameSiteMode.Unspecified;
    options.OnDeleteCookie = (cookieContext)
        => cookieContext.CookieOptions.SameSite = SameSiteMode.Unspecified;
});

builder.Services.ConfigureApplicationCookie(config =>
{
    config.Cookie.Name = "SaM.AnyDeals.Identity.Cookie";
    config.Cookie.SameSite = SameSiteMode.Unspecified;
    config.LoginPath = "/Auth/Login";
    config.LogoutPath = "/Auth/Logout";
});

builder.Services.AddCors(o =>
{
    o.AddPolicy("CorsPolicy", options =>
    {
        options
            .WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseCors("CorsPolicy");

app.UseCookiePolicy();
app.UseStaticFiles();
app.UseRouting();

app.UseIdentityServer();
app.UseAuthentication();

app.MapControllers();

app.Run();
