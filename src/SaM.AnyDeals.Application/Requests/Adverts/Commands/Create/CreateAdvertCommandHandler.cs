using AutoMapper;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.Common.Enums.Adverts;
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
        switch (request.Goal)
        {
            case Goal.Request:
                await CreateRequestAsync(request, cancellationToken);
                break;
            case Goal.Offer:
                await CreateOfferAsync(request, cancellationToken);
                break;
            default:
                throw new InvalidOperationException();
        }

        return new Response();
    }

    private async Task CreateRequestAsync(CreateAdvertCommand request, CancellationToken cancellationToken)
    {
        request = request with
        {
            Price = null,
            AllowedCardPayment = false,
            AllowedCashPayment = false
        };

        await CreateAdvertAsync(request, cancellationToken);
    }

    private async Task CreateOfferAsync(CreateAdvertCommand request, CancellationToken cancellationToken)
    {
        await CreateAdvertAsync(request, cancellationToken);
    }

    private async Task CreateAdvertAsync(CreateAdvertCommand request, CancellationToken cancellationToken)
    {
        var user = await _currentUserService.GetCurrentUserAsync();
        var userId = user.Id;
        var advert = _mapper.Map<AdvertDbEntry>(request);

        await AddNewDraftCategoryIfNotExistsAsync(request, advert, cancellationToken);
        ToSocialAdvert(request, advert);

        advert.CreatorId = userId;

        await _applicationDbContext.Adverts.AddAsync(advert, cancellationToken);
    }

    private async Task AddNewDraftCategoryIfNotExistsAsync(
        CreateAdvertCommand request,
        AdvertDbEntry advert,
        CancellationToken cancellationToken)
    {
        if (request.CategoryId is not null ||
            request.Category is null)
            return;

        var categoryEntry = new CategoryDbEntry
        {
            Name = request.Category,
            Status = Status.Draft
        };

        await _applicationDbContext.Categories.AddAsync(categoryEntry, cancellationToken);
        advert.Category = categoryEntry;
    }

    private void ToSocialAdvert(CreateAdvertCommand request, AdvertDbEntry advert)
    {
        if (request.Interest != Interest.Social)
            return;

        advert.Price = null;
        advert.AllowedCardPayment = false;
        advert.AllowedCashPayment = false;
    }
}