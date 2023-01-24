namespace SaM.AnyDeals.Application.Models.ViewModels;

public class ReviewViewModel
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Comment { get; set; }
    public int Grade { get; set; }
    public DateTime CreatedAt { get; set; }
    public ApplicationUserViewModel? Author { get; set; }
}
