using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using SaM.AnyDeals.API.Hubs;
using SaM.AnyDeals.API.Hubs.Services;
using SaM.AnyDeals.Application;
using SaM.AnyDeals.Common.Interfaces;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Extensions;
using SaM.AnyDeals.Infrastructure;
using SaM.AnyDeals.Infrastructure.Filters;
using Serilog;
using Serilog.Events;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
    .CreateLogger();

try
{
    Log.Information("Starting API");

    var builder = WebApplication.CreateBuilder(args);
    var services = builder.Services;
    var configuration = builder.Configuration;

    builder.Host.UseSerilog();

    services.AddDataAccess(configuration);
    services.AddApplication();
    services.AddInfrastructure();
    services.AddSignalR();

    services.AddTransient<IChatService, ChatService>();

    services
        .AddControllers(options =>
            options.Filters.Add<ApiExceptionFilter>());

    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
        .AddJwtBearer("Bearer", options =>
    {
        var useProxy = false;
        _ = bool.TryParse(Environment.GetEnvironmentVariable("UseProxy"), out useProxy);

        options.Authority = useProxy
            ? "http://identity:80"
            : "https://localhost:44302";

        options.Audience = "AnyDealsAPI";
        options.RequireHttpsMetadata = false;
    });

    services.AddCors(o =>
    {
        o.AddPolicy("CorsPolicy", options =>
        {
            options
                .WithOrigins(
                    "http://localhost:3000",
                    "https://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
    });

    var app = builder.Build();

    app.UseSerilogRequestLogging();
    app.ApplyMigrations();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
    });

    app.UseHttpsRedirection();
    app.UseCors("CorsPolicy");

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
    app.MapHub<ChatHub>("/hubs/chat");

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