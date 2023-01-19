using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.DataAccess.Helpers;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.DataAccess.Models.Elastic;
using SaM.AnyDeals.DataAccess.Models.Entries;
using SaM.AnyDeals.DataAccess.Population;
using SaM.AnyDeals.DataAccess.Services.Interfaces;
using System.Reflection;

namespace SaM.AnyDeals.DataAccess;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
{
    private readonly IElasticService _elasticService;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        IElasticService elasticService)
        : base(options)
    {
        _elasticService = elasticService;
    }

    public DbSet<AdvertDbEntry> Adverts { get; set; }
    public DbSet<AttachmentDbEntry> Attachments { get; set; }
    public DbSet<CategoryDbEntry> Categories { get; set; }
    public DbSet<ContactsDbEntry> Contacts { get; set; }
    public DbSet<CountryDbEntry> Countries { get; set; }
    public DbSet<CityDbEntry> Cities { get; set; }
    public DbSet<OrderDbEntry> Orders { get; set; }
    public DbSet<ReviewDbEntry> Reviews { get; set; }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var changedAdvertsEntries = ChangeTracker
            .Entries<AdvertDbEntry>()
            .Select((entry) => new { entry.State, entry.Entity })
            .ToList();

        var saveChangesResult = await base.SaveChangesAsync(cancellationToken);

        foreach (var entry in changedAdvertsEntries)
        {
            var advert = entry.Entity;

            if(entry.State != EntityState.Deleted)
                await LoadAdvertEntryAsync(advert, cancellationToken);

            var advertElasticEntry = AdvertsHelper.MapDbEntry(advert);

            switch (entry.State)
            {
                case EntityState.Deleted:
                    await _elasticService.DeleteAdvertAsync(advertElasticEntry, cancellationToken);
                    break;
                case EntityState.Modified:
                    await _elasticService.UpdateAdvertAsync(advertElasticEntry, cancellationToken);
                    break;
                case EntityState.Added:
                    await _elasticService.IndexAdvertAsync(advertElasticEntry, cancellationToken);
                    break;
                default:
                    break;
            }
        }

        return saveChangesResult;
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        var hasUseDockerDBFlag = bool.TryParse(Environment.GetEnvironmentVariable("UseDockerDB"), out var inDockerDB);
        if (!hasUseDockerDBFlag || !inDockerDB)
        {
            builder.Populate();
        }

        base.OnModelCreating(builder);
    }

    private async Task<AdvertDbEntry> LoadAdvertEntryAsync(AdvertDbEntry entry, CancellationToken cancellationToken = default)
    {
        await Adverts.Entry(entry)
            .Reference(a => a.City)
            .LoadAsync(cancellationToken);

        await Adverts.Entry(entry)
            .Reference(a => a.Category)
            .LoadAsync(cancellationToken);

        await Cities.Entry(entry.City!)
            .Reference(c => c.Country)
            .LoadAsync(cancellationToken);

        return entry;
    }
}
