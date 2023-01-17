using SaM.AnyDeals.Common.Interfaces;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Delete;

public record DeleteAdvertCommand(int Id) :
    IRequest<Response>,
    IProtectedAdvertAction,
    IChangeDataRequest;

