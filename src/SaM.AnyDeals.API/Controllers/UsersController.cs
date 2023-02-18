﻿using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Users.Queries.GetDetails;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ApiControllerBase
{
    [HttpGet("details/{username}")]
    public async Task<IActionResult> GetUserDetailsAsync([FromRoute] string username, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetUserDetailsQuery(username), cancellationToken));
}
