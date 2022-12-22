using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Auth.Commands.Register;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ApiControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));
}
