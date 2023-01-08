using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace SaM.AnyDeals.DataAccess.Extensions;

public static class ApplyMigrationsExtension
{
    public static void ApplyMigrations(this IApplicationBuilder application)
    {
        using var serviceScope = application.ApplicationServices.CreateScope();
        var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>()
            ?? throw new InvalidOperationException();

        context.Database.Migrate();
    }
}
