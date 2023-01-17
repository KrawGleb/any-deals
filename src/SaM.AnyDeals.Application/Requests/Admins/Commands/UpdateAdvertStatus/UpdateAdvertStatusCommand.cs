using SaM.AnyDeals.Common.Enums.Adverts;

namespace SaM.AnyDeals.Application.Requests.Admins.Commands.UpdateAdvertStatus;

public record UpdateAdvertStatusCommand(int Id, Status Status)
    : IRequest<Response>, IChangeDataRequest;
