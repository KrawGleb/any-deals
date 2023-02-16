using IdentityServer4.Services;
using Microsoft.AspNetCore.HttpOverrides;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.IdentityServer;
using SaM.AnyDeals.IdentityServer.Services;
using SaM.AnyDeals.IdentityServer.Services.Interfaces;
using Serilog;
using Serilog.Events;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
    .CreateLogger();

try
{
    Log.Information("Starting IdentityServer");

    var builder = WebApplication.CreateBuilder(args);
    var services = builder.Services;

    builder.Host.UseSerilog();

    services.AddDataAccess(builder.Configuration);

    services.ConfigureIdentityServer();
    services.ConfigureCookies();

    services.AddTransient<IAuthService, AuthService>();
    services.AddScoped<IProfileService, ProfileService>();

    services.AddCors(o =>
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

    services.AddControllersWithViews();

    var app = builder.Build();

    app.UseSerilogRequestLogging();

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
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
