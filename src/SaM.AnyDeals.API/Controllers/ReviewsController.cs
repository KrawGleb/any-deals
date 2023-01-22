using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Reviews.Commands.Create;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ReviewsController : ApiControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateReviewAsync([FromBody] CreateReviewCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));

}
