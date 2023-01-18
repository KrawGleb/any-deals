using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Requests.Categories.Queries.Get;

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, Response>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IMapper _mapper;

    public GetCategoriesQueryHandler(
        ApplicationDbContext applicationDbContext,
        IMapper mapper)
    {
        _applicationDbContext = applicationDbContext;
        _mapper = mapper;
    }

    public async Task<Response> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await _applicationDbContext
            .Categories
            .Where(c => c.Status == Status.Accepted)
            .ToListAsync(cancellationToken);

        var categoriesVM = _mapper.Map<List<CategoryViewModel>>(categories);

        return new CommonResponse()
        {
            Body = categoriesVM,
        };
    }
}
