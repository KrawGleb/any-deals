using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Enums.Adverts;
using SaM.AnyDeals.Common.Interfaces;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Update;

public class UpdateAdvertCommand : 
    IRequest<Response>,
    IProtectedAdvertAction,
    IChangeDataRequest
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public decimal? Price { get; set; }
    public string? Description { get; set; }
    public Goal Goal { get; set; }
    public Group Group { get; set; }
    public Interest Interest { get; set; }
    public int? CityId { get; set; }
    public int? CategoryId { get; set; }
    public string? Category { get; set; }
    public ContactsViewModel? Contacts { get; set; }
    public List<AttachmentViewModel>? Attachments { get; set; }
}

