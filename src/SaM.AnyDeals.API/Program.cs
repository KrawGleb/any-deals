using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.IdentityModel.Tokens;
using SaM.AnyDeals.API.Hubs;
using SaM.AnyDeals.API.Hubs.Services;
using SaM.AnyDeals.Application;
using SaM.AnyDeals.Common.Interfaces;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Extensions;
using SaM.AnyDeals.Infrastructure;
using SaM.AnyDeals.Infrastructure.Filters;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

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
    .AddJwtBearer(options =>
{
    options.Authority = "http://identity:80";
    options.Audience = "AnyDealsAPI";
    options.RequireHttpsMetadata = false;
/*
    var key = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWTSecurityKey")!);
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = "AnyDealsBackend",
        ValidAudience = "AnyDealsFrontend",
        RequireExpirationTime = true,
    };*/
});

services.AddAuthorization(options =>
{
    options.AddPolicy("ApiScope", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("scope", "any-deals-api");
    });
});

var app = builder.Build();

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/hubs/chat");

app.Run();
