﻿using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Requests.Adverts.Commands;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess.Implementations;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Handlers.Adverts.CommandHandlers;

public class CreateAdvertCommandHandler : IRequestHandler<CreateAdvertCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;
    private readonly UserManager<ApplicationUser> _userManager;

    public CreateAdvertCommandHandler(
        ApplicationDbContext applicationDbContext,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper,
        UserManager<ApplicationUser> userManager)
    {
        _applicationDbContext = applicationDbContext;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
        _userManager = userManager;
    }

    public async Task<Response> Handle(CreateAdvertCommand request, CancellationToken cancellationToken)
    {
        await CreateAdvertAsync(request, cancellationToken);

        return new Response();
    }

    private async Task CreateAdvertAsync(CreateAdvertCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext.GetUserId();
        var advertOwner = await GetAdvertOwnerAsync(userId, cancellationToken);
        var advert = _mapper.Map<AdvertDbEntry>(request);

        var city = await _applicationDbContext
            .Cities
            .SingleOrDefaultAsync(c => c.Name!.ToLower() == request.City!.ToLower(), cancellationToken)
            ?? throw new NotFoundException($"City {request.City} not found.");

        var category = await _applicationDbContext
            .Categories
            .SingleOrDefaultAsync(c => c.Name!.ToLower() == request.Category!.ToLower(), cancellationToken)
            ?? throw new NotFoundException($"Category {request.Category} not found");

        advert.City = city;
        advert.Category = category;

        await _applicationDbContext.Adverts.AddAsync(advert, cancellationToken);
        await _applicationDbContext.SaveChangesAsync(cancellationToken);
        
        advertOwner.Adverts!.Add(advert);
        await _userManager.UpdateAsync(advertOwner);
    }

    private async Task<ApplicationUser> GetAdvertOwnerAsync(string id, CancellationToken cancellationToken)
    {
        var advertOwner = await _userManager
            .Users
            .Include(u => u.Adverts)
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken: cancellationToken)
            ?? throw new NotFoundException($"User with id {id} not found.");

        return advertOwner;
    }
}
