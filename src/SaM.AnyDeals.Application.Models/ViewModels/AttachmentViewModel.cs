using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.Application.Models.ViewModels;

public class AttachmentViewModel
{
    public int Id { get; set; }
    public string? Link { get; set; }
    public AttachmentType Type { get; set; }
}
