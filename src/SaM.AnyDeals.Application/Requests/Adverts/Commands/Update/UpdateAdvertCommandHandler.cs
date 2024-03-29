﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.Common.Enums.Adverts;
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

        var attachments = entity.Attachments;
        var category = entity.Category;

        request.CategoryId = request.CategoryId is null or 0
            ? entity.CategoryId
            : request.CategoryId;

        _applicationDbContext
            .Entry(entity)
            .CurrentValues
            .SetValues(request);

        _applicationDbContext
            .Entry(entity.Contacts!)
            .CurrentValues
            .SetValues(request.Contacts!);

        entity.Category = category;
        entity.Attachments = attachments;

        await UpdateCategoryAsync(entity, request, cancellationToken);
        UpdateAttachments(entity, request);
        UpdateInterest(entity, request);

        entity.Status = Status.Draft;

        return new Response();
    }

    private async Task UpdateCategoryAsync(
        AdvertDbEntry entity,
        UpdateAdvertCommand request,
        CancellationToken cancellationToken)
    {
        _ = entity.Category
            ?? throw new InvalidOperationException($"Advert with id {entity.Id} has null category");
        
        if (request.Category is null)
            return;

        if (entity.Category.Status == Status.Draft)
        {
            entity.Category.Name = request.Category;
        }
        else if (entity.CategoryId != request.CategoryId)
        {
            var draftCategory = new CategoryDbEntry
            {
                Name = request.Category,
                Status = Status.Draft
            };

            await _applicationDbContext.Categories.AddAsync(draftCategory, cancellationToken);

            entity.Category = draftCategory;
        }
    }

    private void UpdateAttachments(AdvertDbEntry entity, UpdateAdvertCommand request)
    {
        var attachments = entity.Attachments ?? Enumerable.Empty<AttachmentDbEntry>();
        var requestAttachments = request.Attachments ?? Enumerable.Empty<AttachmentViewModel>();

        var attachmentsToRemove = attachments
            .Where(a => requestAttachments.All(x => x.Link != a.Link))
            .ToList();
        _applicationDbContext.Attachments.RemoveRange(attachmentsToRemove);

        var attachmentsToCreate = requestAttachments
            .Where(a => !attachments.Any(x => x.Link == a.Link))
            .ToList();
        var attachmentsEntities = _mapper.Map<List<AttachmentDbEntry>>(attachmentsToCreate);
        entity.Attachments?.AddRange(attachmentsEntities);
    }

    private void UpdateInterest(AdvertDbEntry entity, UpdateAdvertCommand request)
    {
        if (request.Interest != Interest.Social)
            return;

        entity.Price = null;
        entity.AllowedCardPayment = false;
        entity.AllowedCashPayment = false;
    }
}