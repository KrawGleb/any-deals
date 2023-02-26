using SaM.AnyDeals.DataAccess.Models.Auth;

namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class MessageDbEntry : AuditableDbEntry
{
    public string? Text { get; set; }

    public Guid ChatId { get; set; }
    public ChatDbEntry? Chat { get; set; }

    public string? SenderId { get; set; }
    public ApplicationUser? Sender { get; set; }
}