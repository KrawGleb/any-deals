using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.DataAccess.Models.Identity;

namespace SaM.AnyDeals.DataAccess.Implementations;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
{
	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
		: base(options)
	{ }
}
