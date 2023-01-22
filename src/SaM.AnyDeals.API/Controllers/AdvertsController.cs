using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Adverts.Commands.Create;
using SaM.AnyDeals.Application.Requests.Adverts.Commands.Delete;
using SaM.AnyDeals.Application.Requests.Adverts.Commands.Update;
using SaM.AnyDeals.Application.Requests.Adverts.Queries.Get;
using SaM.AnyDeals.Application.Requests.Adverts.Queries.GetMy;
using SaM.AnyDeals.Application.Requests.Adverts.Queries.Search;
using SaM.AnyDeals.Application.Requests.Reviews.Queries.Get;
using SaM.AnyDeals.Infrastructure.Filters;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AdvertsController : ApiControllerBase
{
    [HttpPost("create")]
    public async Task<IActionResult> CreateAdvertAsync([FromBody] CreateAdvertCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));

    [HttpDelete("delete")]
    [ServiceFilter(typeof(ProtectedAdvertsActionFilter))]
    public async Task<IActionResult> DeleteAdvertAsync([FromBody] DeleteAdvertCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));

    [HttpPatch("update")]
    [ServiceFilter(typeof(ProtectedAdvertsActionFilter))]
    public async Task<IActionResult> UpdateAdvertAsync([FromBody] UpdateAdvertCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));

    [HttpGet("my")]
    public async Task<IActionResult> GetMyAdvertsAsync(CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetMyAdvertsQuery(), cancellationToken));

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAvertAsync([FromRoute] int id, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetAdvertQuery { Id = id }, cancellationToken));

    [HttpGet("{id}/reviews")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAdvertsReviews([FromRoute] int id, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetAdvertsReviewsQuery(id), cancellationToken));

    [HttpGet("search")]
    [AllowAnonymous]
    public async Task<IActionResult> SearchAdvertsAsync([FromQuery] SearchAdvertsQuery command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));
}
