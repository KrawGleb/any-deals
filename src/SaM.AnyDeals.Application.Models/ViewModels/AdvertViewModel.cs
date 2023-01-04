namespace SaM.AnyDeals.Application.Models.ViewModels;

public class AdvertViewModel
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Goal { get; set; }
    public string? Group { get; set; }
    public string? Interest { get; set; }

    public ApplicationUserViewModel? Creator { get; set; }
    public CityViewModel? City { get; set; }
    public CategoryViewModel? Category { get; set; }
    public ContactsViewModel? Contacts { get; set; }
    public List<AttachmentViewModel>? Attachments { get; set; }
}
