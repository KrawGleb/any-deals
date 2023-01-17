using Microsoft.AspNetCore.Identity;

namespace SaM.AnyDeals.Common.Enums.Auth;

public static class RoleEnum
{
    public const string Admin = "Admin";
    public const string User = "User";

    public static readonly IdentityRole AdminRole = new()
    {
        Id = "677FFB03-B872-4D82-96AF-08A2747699D6",
        Name = Admin,
        NormalizedName = Admin.ToUpper()
    };

    public static readonly IdentityRole UserRole = new()
    {
        Id = "A98F783C-2C85-46AB-BC7D-73F766D04DB3",
        Name = User,
        NormalizedName = User.ToUpper(),
    };

    public static readonly IEnumerable<IdentityRole> Roles = new List<IdentityRole>
    {
        AdminRole,
        UserRole
    };
}
