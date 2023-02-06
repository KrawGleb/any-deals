using AutoMapper;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Requests.Adverts.Commands.Create;

public class CreateAdvertCommandHandler : IRequestHandler<CreateAdvertCommand, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public CreateAdvertCommandHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper,
        ICurrentUserService currentUserService)
    {
        _applicationDbContext = applicationDbContext;
        _mapper = mapper;
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
        var advert = _mapper.Map<AdvertDbEntry>(request);

        if (request.CategoryId is null && request.Category is not null)
        {
            var draftCategory = await AddNewDraftCategoryAsync(request.Category, cancellationToken);
            advert.Category = draftCategory;
        }

        advert.CreatorId = userId;

        await _applicationDbContext.Adverts.AddAsync(advert, cancellationToken);
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
