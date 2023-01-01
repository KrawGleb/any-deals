using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.DataAccess.Models.Entries;
using SaM.AnyDeals.DataAccess.Population;
using System.Reflection;

namespace SaM.AnyDeals.DataAccess.Implementations;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
{
    public DbSet<AdvertDbEntry> Adverts { get; set; }
    public DbSet<AttachmentDbEntry> Attachments { get; set; }
    public DbSet<CategoryDbEntry> Categories { get; set; }
    public DbSet<ContactsDbEntry> Contacts { get; set; }
    public DbSet<CountryDbEntry> Countries { get; set; }
    public DbSet<CityDbEntry> Cities { get; set; }


    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        builder.Populate();
        base.OnModelCreating(builder);
    }
}
