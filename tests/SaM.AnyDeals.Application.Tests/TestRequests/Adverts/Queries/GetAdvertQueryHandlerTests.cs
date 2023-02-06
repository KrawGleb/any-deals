using AutoFixture;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Moq;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Application.Requests.Adverts.Queries.Get;
using SaM.AnyDeals.Application.Tests.Common;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Responses;
using SaM.AnyDeals.DataAccess.Extensions;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Tests.TestRequests.Adverts.Queries;

public class GetAdvertQueryHandlerTests : TestRequestHandlerBase
{
    [Fact]
    public async Task GetAdvertQueryHandler_Success()
    {
        // Arrange
        var advert = FixtureBuilder.CreateAdvert();
        var request = new GetAdvertQuery(advert.Id);

        await _applicationDbContext.Adverts.AddAsync(advert);
        _applicationDbContext.SaveChanges();

        var handler = new GetAdvertQueryHandler(_applicationDbContext, _mapper);

        // Act
        var response = (CommonResponse)await handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.True(response.Succeeded);
        Assert.Equal(((AdvertViewModel?)response.Body)?.Id, advert.Id);
    }

    [Fact]
    public async Task GetAdvertQueryHandler_NotFound()
    {
        // Arrange 
        var request = _fixture.Create<GetAdvertQuery>();

        var handler = new GetAdvertQueryHandler(_applicationDbContext, _mapper);

        // Act & Assert
        _ = Assert.ThrowsAsync<NotFoundException>(
            async () => await handler.Handle(request, CancellationToken.None));
    }
}
