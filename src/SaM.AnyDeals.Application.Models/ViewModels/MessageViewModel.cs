namespace SaM.AnyDeals.Application.Models.ViewModels;

public class MessageViewModel
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? Text { get; set; }
    public ApplicationUserViewModel? Sender { get; set; }
}
