using Microsoft.EntityFrameworkCore;
using Moq;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Services.Interfaces;

namespace SaM.AnyDeals.Application.Tests.Common;

public static class DbContextFactory
{
    public static ApplicationDbContext Create()
    {
        var elasticMock = new Mock<IElasticService>();
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        var context = new ApplicationDbContext(options, elasticMock.Object);
        context.Database.EnsureCreated();

        return context;
    }

    public static void Destroy(ApplicationDbContext context)
    {
        context.Database.EnsureDeleted();
        context.Dispose();
    }
}