using AutoFixture;
using Microsoft.EntityFrameworkCore;
using Moq;
using SaM.AnyDeals.Application.Common.Services.Interfaces;
using SaM.AnyDeals.Application.Requests.Adverts.Commands.Create;
using SaM.AnyDeals.Application.Tests.Common;

namespace SaM.AnyDeals.Application.Tests.TestRequests.Adverts.Commands;

public class CreateAdvertCommandHandlerTests : TestRequestHandlerBase
{
    private readonly Mock<ICurrentUserService> _currentUserServiceMock = new();

    [Fact]
    public async Task CreateAdvertCommandHandler_ExistingCategory()
    {
        // Arrange
        var user = FixtureBuilder.CreateUser();
        var advert = FixtureBuilder.CreateAdvert();
        var command = _fixture.Create<CreateAdvertCommand>();

        _currentUserServiceMock.Setup(x => x.GetCurrentUserAsync()).ReturnsAsync(user);

        var handler = new CreateAdvertCommandHandler(
            _applicationDbContext,
            _mapper,
            _currentUserServiceMock.Object);

        // Act
        var response = await handler.Handle(command, CancellationToken.None);
        _applicationDbContext.SaveChanges();

        // Assert
        Assert.True(response.Succeeded);
        Assert.NotNull(await _applicationDbContext.Adverts.SingleOrDefaultAsync());
    }

    [Fact]
    public async Task CreateAdvertCommandHandler_NewDraftCategory()
    {
        // Arrange
        var user = FixtureBuilder.CreateUser();
        var advert = FixtureBuilder.CreateAdvert();
        var command = _fixture.Create<CreateAdvertCommand>();

        command = command with { CategoryId = null };

        _currentUserServiceMock.Setup(x => x.GetCurrentUserAsync()).ReturnsAsync(user);

        var handler = new CreateAdvertCommandHandler(
            _applicationDbContext,
            _mapper,
            _currentUserServiceMock.Object);

        // Act
        var response = await handler.Handle(command, CancellationToken.None);
        _applicationDbContext.SaveChanges();

        // Assert
        Assert.True(response.Succeeded);
        Assert.NotNull(await _applicationDbContext.Adverts.SingleOrDefaultAsync());
        Assert.NotNull(await _applicationDbContext.Categories.SingleOrDefaultAsync(c => c.Name == command.Category));
    }
}