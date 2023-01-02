using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.Application.Models.ViewModels;

public class AdvertViewModel
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public AdvertGoal Type { get; set; }
    public AdvertGroup SubCategory { get; set; }
    public bool IsCommertial { get; set; }
    public bool IsOffline { get; set; }

    public ApplicationUserViewModel? Creator { get; set; }
    public CityViewModel? City { get; set; }
    public CategoryViewModel? Category { get; set; }
    public ContactsViewModel? Contacts { get; set; }
    public List<AttachmentViewModel>? Attachments { get; set; }
}
