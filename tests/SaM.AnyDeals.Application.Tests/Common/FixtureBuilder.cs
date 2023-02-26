using AutoFixture;
using SaM.AnyDeals.DataAccess.Models.Auth;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Tests.Common;

public static class FixtureBuilder
{
    private static readonly Fixture _fixture = new();

    public static ApplicationUser CreateUser()
    {
        return _fixture
            .Build<ApplicationUser>()
            .Without(u => u.Orders)
            .Without(u => u.Execution)
            .Without(u => u.Messages)
            .Without(u => u.Adverts)
            .Without(u => u.Reviews)
            .Create();
    }

    public static AdvertDbEntry CreateAdvert()
    {
        return _fixture
            .Build<AdvertDbEntry>()
            .Without(a => a.Creator)
            .Without(a => a.Orders)
            .Without(a => a.Reviews)
            .With(a => a.Category, _fixture.Build<CategoryDbEntry>()
                .Without(c => c.Adverts)
                .Create())
            .With(a => a.City, _fixture.Build<CityDbEntry>()
                .With(c => c.Country, _fixture.Build<CountryDbEntry>()
                    .Without(c => c.Cities).Create())
                .Without(c => c.Adverts).Create())
            .With(a => a.Contacts, _fixture.Build<ContactsDbEntry>()
                .Without(c => c.Advert).Create())
            .With(a => a.Attachments, _fixture.Build<AttachmentDbEntry>()
                .Without(c => c.Advert).CreateMany().ToList())
            .Create();
    }
}