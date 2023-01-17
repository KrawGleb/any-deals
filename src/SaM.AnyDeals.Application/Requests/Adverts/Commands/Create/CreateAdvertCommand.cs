﻿using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Enums.Adverts;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Create;

public record CreateAdvertCommand(
    string? Title,
    string? Description,
    Goal Goal,
    Group Group,
    Interest Interest,
    int? CityId,
    int? CategoryId,
    ContactsViewModel? Contacts,
    List<AttachmentViewModel>? Attachments
    ) : IRequest<Response>, IChangeDataRequest;