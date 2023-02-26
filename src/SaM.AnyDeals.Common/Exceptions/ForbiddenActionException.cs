namespace SaM.AnyDeals.Common.Exceptions;

public class ForbiddenActionException : Exception
{
    public ForbiddenActionException()
    {
    }

    public ForbiddenActionException(string message) : base(message)
    {
    }

    public ForbiddenActionException(string message, Exception innerException) : base(message, innerException)
    {
    }
}