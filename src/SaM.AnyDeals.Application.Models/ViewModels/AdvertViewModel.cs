using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.Common.Enums.Adverts;

namespace SaM.AnyDeals.Application.Models.ViewModels;

public class AdvertViewModel
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public decimal? Price { get; set; }
    public bool AllowedCardPayment { get; set; }
    public bool AllowedCashPayment { get; set; }
    public Goal Goal { get; set; }
    public Group Group { get; set; }
    public Interest Interest { get; set; }
    public Status Status { get; set; }
    public DateTime CreatedAt { get; set; }

    public ApplicationUserViewModel? Creator { get; set; }
    public CityViewModel? City { get; set; }
    public CategoryViewModel? Category { get; set; }
    public ContactsViewModel? Contacts { get; set; }
    public List<AttachmentViewModel>? Attachments { get; set; }
}
