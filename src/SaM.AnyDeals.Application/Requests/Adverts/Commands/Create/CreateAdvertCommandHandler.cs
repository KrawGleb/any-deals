using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Extensions;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Create;

public class CreateAdvertCommandHandler : IRequestHandler<CreateAdvertCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;
    private readonly UserManager<ApplicationUser> _userManager;

    public CreateAdvertCommandHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper,
        UserManager<ApplicationUser> userManager,
        ICurrentUserService currentUserService)
    {
        _applicationDbContext = applicationDbContext;
        _mapper = mapper;
        _userManager = userManager;
        _currentUserService = currentUserService;
    }

    public async Task<Response> Handle(CreateAdvertCommand request, CancellationToken cancellationToken)
    {
        await CreateAdvertAsync(request, cancellationToken);

        return new Response();
    }

    private async Task CreateAdvertAsync(CreateAdvertCommand request, CancellationToken cancellationToken)
    {
        var user = await _currentUserService.GetCurrentUserAsync();
        var userId = user.Id;
        var advertOwner = await GetAdvertOwnerAsync(userId, cancellationToken);
        var advert = _mapper.Map<AdvertDbEntry>(request);

        if (request.CategoryId is null && request.Category is not null)
        {
            var draftCategory = await AddNewDraftCategoryAsync(request.Category, cancellationToken);
            advert.Category = draftCategory;
        }

        advert.Creator = advertOwner;

        await _applicationDbContext.Adverts.AddAsync(advert, cancellationToken);
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

    private async Task<CategoryDbEntry> AddNewDraftCategoryAsync(string categoryName, CancellationToken cancellationToken)
    {
        var categoryEntry = new CategoryDbEntry()
        {
            Name = categoryName,
            Status = Status.Draft
        };

        await _applicationDbContext.Categories.AddAsync(categoryEntry, cancellationToken);

        return categoryEntry;
    }
}
