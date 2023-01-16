using MediatR;
using SaM.AnyDeals.Application.Models.Interfaces;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Enums.Adverts;
using SaM.AnyDeals.Common.Interfaces;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Update;

public record UpdateAdvertCommand(
    int Id,
    string? Title,
    string? Description,
    Goal Goal,
    Group Group,
    Interest Interest,
    int? CityId,
    int? CategoryId,
    ContactsViewModel? Contacts,
    List<AttachmentViewModel>? Attachments
    ) : 
    IRequest<Response>, 
    IProtectedAdvertAction,
    IChangeDataRequest;
