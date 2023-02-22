using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class OrderDbEntry : AuditableDbEntry
{
    public bool HasCustomerApproval { get; set; }
    public bool HasExecutorApproval { get; set; }
    public bool ArchivatedByCustomer { get; set; }
    public bool ArchivatedByExecutor { get; set; }
    public PaymentMethod? PaymentMethod { get; set; }

    public int? AdvertId { get; set; }
    public AdvertDbEntry? Advert { get; set; }

    public string? CustomerId { get; set; }
    public ApplicationUser? Customer { get; set; }

    public string? ExecutorId { get; set; }
    public ApplicationUser? Executor { get; set; }

    public Guid ChatId { get; set; }
    public ChatDbEntry? Chat { get; set; }
}
