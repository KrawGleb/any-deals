using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Adverts.Commands;
using SaM.AnyDeals.Application.Requests.Adverts.Queries;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AdvertsController : ApiControllerBase
{
    [HttpPost("create")]
    public async Task<IActionResult> CreateAdvertAsync([FromBody] CreateAdvertCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));

    [HttpGet("get/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAvertAsync([FromRoute] int id, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetAdvertQuery { Id = id }, cancellationToken));
}
