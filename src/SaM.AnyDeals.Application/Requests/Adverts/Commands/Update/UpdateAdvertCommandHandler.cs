using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Extensions;
using SaM.AnyDeals.DataAccess.Models.Entries;

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
        var entity = await _applicationDbContext.Adverts
            .FullInclude()
            .SingleOrDefaultAsync(a => a.Id == request.Id, cancellationToken)
            ?? throw new NotFoundException($"Advert with id {request.Id} not found.");

        var attachments = entity.Attachments ?? Enumerable.Empty<AttachmentDbEntry>();
        var requestAttachments = request.Attachments ?? Enumerable.Empty<AttachmentViewModel>();

        _applicationDbContext
            .Entry(entity.Contacts!)
            .CurrentValues
            .SetValues(request.Contacts!);

        /*_applicationDbContext
            .Entry(entity.Contacts!)
            .Property(c => c.Id)
            .IsModified = false;
*/
        _applicationDbContext
            .Entry(entity)
            .CurrentValues
            .SetValues(request);

        var attachmentsToRemove = attachments
            .Where(a => !requestAttachments.Any(x => x.Link == a.Link));
        _applicationDbContext.Attachments.RemoveRange(attachmentsToRemove);

        var attachmentsToCreate = requestAttachments
            .Where(a => !attachments.Any(x => x.Link == a.Link));
        var attachmentsEntities = _mapper.Map<List<AttachmentDbEntry>>(attachmentsToCreate);
        entity.Attachments?.AddRange(attachmentsEntities);

        await _applicationDbContext.SaveChangesAsync(cancellationToken);

        return new Response();
    }
}
