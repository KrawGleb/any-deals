using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.Application.Models.ViewModels;

public class CategoryViewModel
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public Status Status { get; set; }
}
