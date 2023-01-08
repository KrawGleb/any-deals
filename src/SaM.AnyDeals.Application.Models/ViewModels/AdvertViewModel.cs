namespace SaM.AnyDeals.Application.Models.ViewModels;

public class AdvertViewModel
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int Goal { get; set; }
    public int Group { get; set; }
    public int Interest { get; set; }

    public ApplicationUserViewModel? Creator { get; set; }
    public CityViewModel? City { get; set; }
    public CategoryViewModel? Category { get; set; }
    public ContactsViewModel? Contacts { get; set; }
    public List<AttachmentViewModel>? Attachments { get; set; }
}
