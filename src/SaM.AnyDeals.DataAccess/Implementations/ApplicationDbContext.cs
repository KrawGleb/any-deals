using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.DataAccess.Models.Entries;
using System.Reflection;

namespace SaM.AnyDeals.DataAccess.Implementations;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
{
    private DbSet<AdvertDbEntry> Adverts { get; set; }
    private DbSet<AttachmentDbEntry> Attachments { get; set; }
    private DbSet<CategoryDbEntry> Categories { get; set; }
    private DbSet<ContactsDbEntry> Contacts { get; set; }
    private DbSet<CountryDbEntry> Countries { get; set; }
    private DbSet<CityDbEntry> Cities { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }
}
