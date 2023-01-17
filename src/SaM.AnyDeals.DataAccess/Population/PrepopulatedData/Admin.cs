using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.DataAccess.Population.PrepopulatedData;

public static class Admin
{
    private static readonly ApplicationUser _instance = new()
    {
        Id = "A3BF16BB-378C-4350-8BFF-FF1ED9CB2915",
        UserName = "Creator",
        NormalizedUserName = "CREATOR",
        Email = "krawcevitsch@gmail.com",
        NormalizedEmail = "KRAWCEVITSCH@GMAIL.COM",
        PasswordHash = "AQAAAAEAACcQAAAAENmR3VyO1iFAng5WjdT6ziiANQvfQFn4Qy7WHWJisPNljF6EUGibbRB9mTjpWJ2Y6A"
    };

    public static ApplicationUser Instance { get => _instance; }
}
