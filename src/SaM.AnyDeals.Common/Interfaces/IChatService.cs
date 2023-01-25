namespace SaM.AnyDeals.Common.Interfaces;

public interface IChatService
{
    Task NotifyGroupAsync(Guid group, string notification, object? arg = null, CancellationToken cancellationToken = default);
}
