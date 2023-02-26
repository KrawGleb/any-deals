using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.Application.Models.ViewModels;

public class OrderViewModel
{
    public int Id { get; set; }
    public AdvertViewModel? Advert { get; set; }
    public ApplicationUserViewModel? Customer { get; set; }
    public ApplicationUserViewModel? Executor { get; set; }
    public bool HasCustomerApproval { get; set; }
    public bool HasExecutorApproval { get; set; }
    public bool ArchivatedByCustomer { get; set; }
    public bool ArchivatedByExecutor { get; set; }
    public PaymentMethod PaymentMethod { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid ChatId { get; set; }
}