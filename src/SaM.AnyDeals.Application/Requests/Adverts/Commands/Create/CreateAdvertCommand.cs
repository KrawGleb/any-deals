using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Enums.Adverts;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Create;

public record CreateAdvertCommand(
    string? Title,
    string? Description,
    decimal? Price,
    bool AllowedCardPayment,
    bool AllowedCashPayment,
    Goal Goal,
    Group Group,
    Interest Interest,
    int? CityId,
    int? CategoryId,
    string? Category,
    ContactsViewModel? Contacts,
    List<AttachmentViewModel>? Attachments
    ) : IRequest<Response>, IChangeDataRequest;