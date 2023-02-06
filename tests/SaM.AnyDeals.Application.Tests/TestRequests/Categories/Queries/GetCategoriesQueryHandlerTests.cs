using AutoFixture;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Application.Requests.Categories.Queries.Get;
using SaM.AnyDeals.Application.Tests.Common;
using SaM.AnyDeals.Common.Enums;
using SaM.AnyDeals.Common.Responses;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Tests.TestRequests.Categories.Queries;

public class GetCategoriesQueryHandlerTests : TestRequestHandlerBase
{
    [Fact]
    public async Task GetCategoriesQueryHandler_OnlyAccepted()
    {
        // Arrange
        var categoryComposerBase = _fixture
            .Build<CategoryDbEntry>()
            .Without(c => c.Adverts)
            .With(c => c.Id, 0);

        var acceptedCategories = categoryComposerBase
            .With(c => c.Status, Status.Accepted)
            .CreateMany();
        var draftCategories = categoryComposerBase
            .With(c => c.Status, Status.Draft)
            .CreateMany();
        var rejectedCategories = categoryComposerBase
            .With(c => c.Status, Status.Rejected)
            .CreateMany();

        var categories = acceptedCategories.Concat(draftCategories).Concat(rejectedCategories);
        await _applicationDbContext.Categories.AddRangeAsync(categories);
        _applicationDbContext.SaveChanges();

        var request = new GetCategoriesQuery();
        var handler = new GetCategoriesQueryHandler(_applicationDbContext, _mapper);

        // Act
        var response = (CommonResponse)await handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.True(response.Succeeded);
        Assert.NotNull((List<CategoryViewModel>?)response.Body);
        Assert.NotEmpty((List<CategoryViewModel>?)response.Body!);
        Assert.All(
            (List<CategoryViewModel>?)response.Body!,
            c => Assert.Equal(Status.Accepted, c.Status));
    }
}
