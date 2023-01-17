using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Enums.Adverts;
using SaM.AnyDeals.Common.Enums.Auth;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Extensions;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Update;

public class UpdateAdvertCommandHandler : IRequestHandler<UpdateAdvertCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UpdateAdvertCommandHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper,
        IHttpContextAccessor httpContextAccessor)
    {
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
        _applicationDbContext = applicationDbContext;
    }

    public async Task<Response> Handle(UpdateAdvertCommand request, CancellationToken cancellationToken)
    {
        var entity = await _applicationDbContext.Adverts
            .FullInclude()
            .SingleOrDefaultAsync(a => a.Id == request.Id, cancellationToken)
            ?? throw new NotFoundException($"Advert with id {request.Id} not found.");

        _applicationDbContext
            .Entry(entity)
            .CurrentValues
            .SetValues(request);

        _applicationDbContext
            .Entry(entity.Contacts!)
            .CurrentValues
            .SetValues(request.Contacts!);

        UpdateAttachments(entity, request);

        entity.Status = _httpContextAccessor.HttpContext.User.IsInRole(RolesEnum.Admin)
            ? request.Status
            : Status.OnModeration;
        
        return new Response();
    }

    private void UpdateAttachments(AdvertDbEntry entity, UpdateAdvertCommand request)
    {
        var attachments = entity.Attachments ?? Enumerable.Empty<AttachmentDbEntry>();
        var requestAttachments = request.Attachments ?? Enumerable.Empty<AttachmentViewModel>();

        var attachmentsToRemove = attachments
            .Where(a => !requestAttachments.Any(x => x.Link == a.Link));
        _applicationDbContext.Attachments.RemoveRange(attachmentsToRemove);

        var attachmentsToCreate = requestAttachments
            .Where(a => !attachments.Any(x => x.Link == a.Link));
        var attachmentsEntities = _mapper.Map<List<AttachmentDbEntry>>(attachmentsToCreate);
        entity.Attachments?.AddRange(attachmentsEntities);
    }
}
