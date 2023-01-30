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
        // see https://identityserver4.readthedocs.io/en/latest/topics/resources.html
        options.EmitStaticAudienceClaim = true;
    })
    .AddAspNetIdentity<ApplicationUser>()
    .AddInMemoryApiResources(Config.ApiResources)
    .AddInMemoryIdentityResources(Config.IdentityResources)
    .AddInMemoryApiScopes(Config.ApiScopes)
    .AddInMemoryClients(Config.Clients)
    .AddDeveloperSigningCredential();

builder.Services.ConfigureApplicationCookie(config =>
{
    config.Cookie.Name = "SaM.AnyDeals.Identity.Cookie";
    config.LoginPath = "/Auth/Login";
    config.LogoutPath = "/Auth/Logout";
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

app.UseStaticFiles();
app.UseRouting();
app.UseIdentityServer();
app.MapControllers();

app.Run();
