using MediatR;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Common.Interfaces;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Delete;

public class DeleteAdvertCommand : IRequest<Response>, IProtectedAdvertAction
{
    public int Id { get; set; }
}
