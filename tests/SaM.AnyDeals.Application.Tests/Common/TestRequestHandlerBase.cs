using AutoFixture;
using AutoMapper;
using SaM.AnyDeals.Application.Common.MappingProfiles;
using SaM.AnyDeals.DataAccess;

namespace SaM.AnyDeals.Application.Tests.Common;

public abstract class TestRequestHandlerBase : IDisposable
{
    protected readonly ApplicationDbContext _applicationDbContext;
    protected readonly IMapper _mapper;
    protected readonly Fixture _fixture;

    public TestRequestHandlerBase()
    {
        _fixture = new();
        _applicationDbContext = DbContextFactory.Create();

        var mapperCfg = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile(new AdvertMappingProfile());
            cfg.AddProfile(new CategoryMappingProfile());
            cfg.AddProfile(new CityMappingProfile());
            cfg.AddProfile(new ApplicationUserMappingProfile());
            cfg.AddProfile(new ContactsMappingProfile());
            cfg.AddProfile(new CountryMappingProfile());
            cfg.AddProfile(new AttachmentMappingProfile());
        });
        _mapper = mapperCfg.CreateMapper();
    }

    public void Dispose()
    {
        DbContextFactory.Destroy(_applicationDbContext);
    }
}
