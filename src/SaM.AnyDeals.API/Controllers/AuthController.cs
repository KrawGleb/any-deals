using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Auth.Commands.Register;
using SaM.AnyDeals.Application.Requests.Auth.Queries.Login;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ApiControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginQuery query, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(query, cancellationToken));
}
