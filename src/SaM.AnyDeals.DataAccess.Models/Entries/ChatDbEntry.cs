namespace SaM.AnyDeals.DataAccess.Models.Entries;

public class ChatDbEntry
{
    public Guid Id { get; set; }
    public List<MessageDbEntry>? Messages { get; set; }

    public OrderDbEntry? Order { get; set; }
}