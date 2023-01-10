using MediatR;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Update;

public record UpdateAdvertCommand(
    string? Title,
    string? Description,
    AdvertGoal Goal,
    AdvertGroup Group,
    AdvertInterest Interest,
    int? CityId,
    int? CategoryId,
    ContactsViewModel? Contacts,
    List<AttachmentViewModel>? Attachments
    ) : IRequest<Response>;
