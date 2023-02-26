using SaM.AnyDeals.Common.Enums;

namespace SaM.AnyDeals.Application.Requests.Admins.Commands.UpdateAdvertStatus;

public record UpdateAdvertStatusCommand(int? Id, Status Status)
    : IRequest<Response>, IChangeDataRequest;