using System.Runtime.Serialization;

namespace SaM.AnyDeals.Common.Enums;

public enum SubCategory
{
    [EnumMember(Value = "Nearbly service")]
    NearblyService = 0,
    [EnumMember(Value = "Online service")]
    OnlineService,
    [EnumMember(Value = "Event or place")]
    EventOrPlace
}
