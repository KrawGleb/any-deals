using AutoFixture;
using AutoMapper;
using Moq;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Application.Requests.Adverts.Queries.GetMy;
using SaM.AnyDeals.Application.Tests.Common;
using SaM.AnyDeals.Common.Responses;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Tests.TestRequests.Adverts.Queries;

public class GetMyAdvertsQueryHandlerTests : TestRequestHandlerBase
{
    private readonly Mock<ICurrentUserService> _currentUserServiceMock = new();

    [Fact]
    public async Task GetMyAdvertsQueryHandler_Success()
    {
        // Arrange
        var request = _fixture.Create<GetMyAdvertsQuery>();
        var user = FixtureBuilder.CreateUser();
        var adverts = Enumerable.Repeat(0, 2).Select(_ =>
        {
            var advert = FixtureBuilder.CreateAdvert();
            advert.CreatorId = user.Id;
            return advert;
        }).ToList();
        var advertsVM = adverts.Select(advert =>
        {
            var advertVM = _fixture.Create<AdvertViewModel>();
            advertVM.Id = advert.Id;
            return advertVM;
        }).ToList();

        await _applicationDbContext.AddRangeAsync(adverts);
        _applicationDbContext.SaveChanges();

        _currentUserServiceMock
            .Setup(x => x.GetCurrentUserAsync())
            .ReturnsAsync(user);

        var handler = new GetMyAdvertsQueryHandler(
            _applicationDbContext,
            _mapper,
            _currentUserServiceMock.Object);

        // Act
        var response = (CommonResponse)await handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.True(response.Succeeded);
        Assert.Equal(((List<AdvertViewModel>?)response.Body)?.Count, 2);
    }
}
