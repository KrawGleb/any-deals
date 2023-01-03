using MediatR;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands;

public class CreateAdvertCommand : IRequest<Response>
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public AdvertGoal Goal { get; set; }
    public AdvertGroup Group { get; set; }
    public AdvertInterest Interest { get; set; }
    public string? City { get; set; }
    public string? Category { get; set; }
    public ContactsViewModel? Contacts { get; set; }
    public List<AttachmentViewModel>? Attachments { get; set; }
}
