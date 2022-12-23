﻿using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using SaM.AnyDeals.Application.Models.Responses;
using SaM.AnyDeals.Application.Requests.Adverts.Commands;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess.Implementations;
using SaM.AnyDeals.DataAccess.Interfaces.Repositories;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Handlers.Adverts.CommandHandlers;

public class CreateAdvertCommandHandler : IRequestHandler<CreateAdvertCommand, Response>
{
    private readonly IAdvertsRepository _advertsRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _applicationDbContext;

    public CreateAdvertCommandHandler(
        IAdvertsRepository advertsRepository,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper,
        UserManager<ApplicationUser> userManager,
        ApplicationDbContext applicationDbContext)
    {
        _advertsRepository = advertsRepository;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
        _userManager = userManager;
        _applicationDbContext = applicationDbContext;
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

        advertOwner.Adverts!.Add(advert);

        await _advertsRepository.CreateAsync(advert, cancellationToken);
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
