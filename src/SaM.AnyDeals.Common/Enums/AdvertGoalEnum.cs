using System.Runtime.Serialization;

namespace SaM.AnyDeals.Common.Enums;

public enum AdvertGoal
{
    [EnumMember(Value = "Request")]
    Request = 0,
    [EnumMember(Value = "Offer")]
    Offer
}
