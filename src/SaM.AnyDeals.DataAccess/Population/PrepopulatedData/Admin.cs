using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.DataAccess.Population.PrepopulatedData;

public static class Admin
{
    public static ApplicationUser Instance { get; } = new()
    {
        Id = "A3BF16BB-378C-4350-8BFF-FF1ED9CB2915",
        UserName = "Creator",
        NormalizedUserName = "CREATOR",
        Email = "krawcevitsch@gmail.com",
        NormalizedEmail = "KRAWCEVITSCH@GMAIL.COM",
        PasswordHash = "AQAAAAIAAYagAAAAEB/hF/keKdkskDEYFdhZ7lHcIjurutz0c/qjUWulEFXc39EN4goFOXO060Dhs45Sfw==",
        ConcurrencyStamp = "f8f7f881-1a3d-46d6-a74e-17bcd658cc46",
        SecurityStamp = "30114e5f-fa10-44df-81a8-9a250136a760"
    };
}