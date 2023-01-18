using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class OrderDbEntry : DbEntryBase
{
    public int AdvertId { get; set; }
    public AdvertDbEntry? Advert { get; set; }

    public string? CustomerId { get; set; }
    public ApplicationUser? Customer { get; set; }

    public string? ExecutorId { get; set; }
    public ApplicationUser? Executor { get; set; }

    public bool HasCustomerApproval { get; set; }
    public bool HasExecutorApproval { get; set; }
    public DateTime CreatedAt { get; set; }
}
