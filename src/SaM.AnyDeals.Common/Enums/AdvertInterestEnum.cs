using System.Runtime.Serialization;

namespace SaM.AnyDeals.Common.Enums;

public enum AdvertInterest
{
    [EnumMember(Value = "Commercial")]
    Commercial = 0,
    [EnumMember(Value = "Social")]
    Social
}
