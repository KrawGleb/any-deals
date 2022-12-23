using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Adverts.Commands;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AdvertsController : ApiControllerBase
{
    [HttpPost("create")]
    public async Task<IActionResult> CreateAdvertAsync([FromBody] CreateAdvertCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));
}
