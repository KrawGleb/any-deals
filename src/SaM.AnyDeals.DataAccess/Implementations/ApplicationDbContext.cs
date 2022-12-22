using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.DataAccess.Models.Identity;
using System.Reflection;

namespace SaM.AnyDeals.DataAccess.Implementations;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
{
	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
		: base(options)
	{ }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);  
    }
}
