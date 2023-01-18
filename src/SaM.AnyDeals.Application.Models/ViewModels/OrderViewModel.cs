namespace SaM.AnyDeals.Application.Models.ViewModels;

public class OrderViewModel
{
    public int Id { get; set; }
    public int AdvertId { get; set; }
    public ApplicationUserViewModel? Customer { get; set; }
    public ApplicationUserViewModel? Executor { get; set; }
    public bool HasCustomerApproval { get; set; }
    public bool HasExecutorApproval { get; set; }
    public DateTime CreatedAt { get; set; }

}
