namespace SaM.AnyDeals.Common.Exceptions;

public class ForbiddentActionException : Exception
{
    public ForbiddentActionException() : base() { }

    public ForbiddentActionException(string message) : base(message) { }

    public ForbiddentActionException(string message, Exception innerException) : base(message, innerException) { }
}
