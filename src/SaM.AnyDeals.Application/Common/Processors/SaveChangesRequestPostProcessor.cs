using MediatR.Pipeline;
using Microsoft.EntityFrameworkCore;
using SaM.AnyDeals.DataAccess;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.Application.Common.Processors;

public class SaveChangesRequestPostProcessor<TRequest, TResponse> : IRequestPostProcessor<TRequest, TResponse>
    where TRequest : IChangeDataRequest, IRequest<TResponse>
{
    private readonly ApplicationDbContext _applicationDbContext;

    public SaveChangesRequestPostProcessor(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task Process(TRequest request, TResponse response, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;

        _applicationDbContext.ChangeTracker.Entries<AuditableDbEntry>().ToList()
            .ForEach(entry =>
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = now;
                }
            });

        await _applicationDbContext.SaveChangesAsync(cancellationToken);
    }
}