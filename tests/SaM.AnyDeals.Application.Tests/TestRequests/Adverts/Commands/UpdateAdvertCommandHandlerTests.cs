using AutoFixture;
using AutoMapper;
using Moq;
using SaM.AnyDeals.Application.Models.ViewModels;
using SaM.AnyDeals.Application.Requests.Adverts.Commands.Update;
using SaM.AnyDeals.Application.Tests.Common;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Tests.TestRequests.Adverts.Commands;

public class UpdateAdvertCommandHandlerTests : TestRequestHandlerBase
{
    private readonly Mock<IMapper> _mapperMock = new();

    [Fact]
    public async Task UpdateAdvertCommandHandler_Success()
    {
        // Arrange
        var advert = FixtureBuilder.CreateAdvert();
        var attachment = _fixture
            .Build<AttachmentDbEntry>()
            .Without(a => a.Advert)
            .With(a => a.Id, 0)
            .Create();
        var attachments = Enumerable.Repeat(attachment, 3).ToList();
        var request = _fixture
            .Build<UpdateAdvertCommand>()
            .With(a => a.Id, advert.Id)
            .With(a => a.CityId, 0)
            .Create();

        await _applicationDbContext.Adverts.AddAsync(advert);
        _applicationDbContext.SaveChanges();

        _mapperMock
            .Setup(x => x.Map<List<AttachmentDbEntry>>(It.IsAny<List<AttachmentViewModel>>()))
            .Returns(attachments);

        var handler = new UpdateAdvertCommandHandler(_applicationDbContext, _mapperMock.Object);

        // Act
        var response = await handler.Handle(request, CancellationToken.None);
        _applicationDbContext.SaveChanges();

        // Arrange
        Assert.True(response.Succeeded);
        Assert.Equal(request.Title, advert.Title);
        Assert.Equal(request.Description, advert.Description);
        Assert.Equal(request.Goal, advert.Goal);
        Assert.Equal(request.Interest, advert.Interest);
        Assert.Equal(request.Group, advert.Group);
        Assert.Equal(attachments, advert.Attachments);
        Assert.True(advert.Category?.Name == request.Category ||
                    advert.Category?.Id == request.CategoryId);
    }
}
