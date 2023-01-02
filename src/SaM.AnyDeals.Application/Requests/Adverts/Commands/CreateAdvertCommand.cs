using MediatR;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands;

public class CreateAdvertCommand : IRequest<Response>
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public AdvertType Type { get; set; }
    public SubCategory SubCategory { get; set; }
    public bool IsCommercial { get; set; }
    public bool IsOffline { get; set; }
    public int CityId { get; set; }
    public int CategoryId { get; set; }
    public ContactsViewModel? Contacts { get; set; }
    public List<AttachmentViewModel>? Attachments { get; set; }
}
