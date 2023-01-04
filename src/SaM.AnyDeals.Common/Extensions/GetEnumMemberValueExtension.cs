using System.Reflection;
using System.Runtime.Serialization;

namespace SaM.AnyDeals.Common.Extensions;

public static class GetEnumMemberValueExtension
{
    public static string? GetEnumMemberValue<T>(this T value)
        where T : Enum
    {
        return typeof(T)
            .GetTypeInfo()
            .DeclaredMembers
            .SingleOrDefault(x => x.Name == value.ToString())?
            .GetCustomAttribute<EnumMemberAttribute>(false)?
            .Value;
            
    }
}
