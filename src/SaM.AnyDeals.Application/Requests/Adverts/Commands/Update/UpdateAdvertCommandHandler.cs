using AutoMapper;
using MediatR;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Update;

public class UpdateAdvertCommandHandler : IRequestHandler<UpdateAdvertCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IMapper _mapper;

    public UpdateAdvertCommandHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper)
    {
        _mapper = mapper;
        _applicationDbContext = applicationDbContext;
    }

    public async Task<Response> Handle(UpdateAdvertCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
