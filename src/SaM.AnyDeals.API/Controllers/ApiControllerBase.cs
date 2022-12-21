using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ApiControllerBase : ControllerBase
{
    private ISender? _mediator = null;

    public ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
}
