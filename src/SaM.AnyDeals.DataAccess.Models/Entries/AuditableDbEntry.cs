namespace SaM.AnyDeals.DataAccess.Models.Entries;

public abstract class AuditableDbEntry : DbEntryBase
{
    public DateTime CreatedAt { get; set; }
}