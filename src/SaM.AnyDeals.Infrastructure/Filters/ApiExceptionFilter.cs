using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using SaM.AnyDeals.Common.Exceptions;
using SaM.AnyDeals.Common.Responses;

namespace SaM.AnyDeals.Infrastructure.Filters;

public class ApiExceptionFilter : IActionFilter, IOrderedFilter
{
    private readonly IDictionary<Type, Action<ActionExecutedContext>> _exceptionHandlers;
    private readonly ILogger<ApiExceptionFilter> _logger;

    public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
    {
        _logger = logger;
        _exceptionHandlers = new Dictionary<Type, Action<ActionExecutedContext>>
        {
            { typeof(NotFoundException), HandleNotFoundException },
            { typeof(ValidationException), HandleValidationException },
            { typeof(ForbiddenActionException), HandleForbiddenActionException }
        };
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Exception is not null)
            HandleException(context);
    }

    public int Order => int.MaxValue - 10;

    private void HandleException(ActionExecutedContext context)
    {
        var type = context.Exception.GetType();
        if (_exceptionHandlers.TryGetValue(type, out var value))
        {
            value.Invoke(context);
            context.ExceptionHandled = true;
            return;
        }

        HandleUnknownException(context);
    }

    private void HandleUnknownException(ActionExecutedContext context)
    {
        _logger.LogInformation(context.Exception, "Unknown exception occurred");
        var response = new ErrorResponse
        {
            Errors = new[]
            {
                "An error occured while processing request.",
                context.Exception.Message
            }
        };

        context.Result = new ObjectResult(response)
        {
            StatusCode = StatusCodes.Status500InternalServerError
        };
    }

    private void HandleNotFoundException(ActionExecutedContext context)
    {
        _logger.LogInformation(context.Exception, "Not found exception occurred");
        var response = new ErrorResponse
        {
            Errors = new[] { context.Exception.Message }
        };

        context.Result = new ObjectResult(response)
        {
            StatusCode = StatusCodes.Status404NotFound
        };
    }

    private void HandleForbiddenActionException(ActionExecutedContext context)
    {
        _logger.LogInformation(context.Exception, "Forbiddenr action");
        var response = new ErrorResponse
        {
            Errors = new[] { "Forbidden action." }
        };

        context.Result = new ObjectResult(response)
        {
            StatusCode = StatusCodes.Status403Forbidden
        };
    }

    private void HandleValidationException(ActionExecutedContext context)
    {
        _logger.LogInformation(context.Exception, "Validation exception occurred");
        var exception = (ValidationException)context.Exception;
        var errors = exception.Errors.Select(e => e.ErrorMessage);

        var response = new ErrorResponse
        {
            Errors = errors
        };

        context.Result = new ObjectResult(response)
        {
            StatusCode = StatusCodes.Status400BadRequest
        };
    }
}