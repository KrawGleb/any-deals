using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Admins.Commands.UpdateAdvertStatus;
using SaM.AnyDeals.Common.Enums.Auth;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = RolesEnum.Admin)]
public class AdminsController : ApiControllerBase
{
    [HttpPut("advert/{id}/status")]
    public async Task<IActionResult> UpdateAdvertsStatus([FromRoute] int id, [FromBody] UpdateAdvertStatusCommand command)
        => Ok(await Mediator.Send(command with { Id = id }));
}
