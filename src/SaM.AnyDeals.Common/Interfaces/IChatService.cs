namespace SaM.AnyDeals.Common.Interfaces;

public interface IChatService
{
    Task NotifyAsync(string method, object? arg = null, CancellationToken cancellationToken = default);
}
