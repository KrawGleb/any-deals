using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Orders.Commands.Approve;
using SaM.AnyDeals.Application.Requests.Orders.Commands.Archive;
using SaM.AnyDeals.Application.Requests.Orders.Commands.Create;
using SaM.AnyDeals.Application.Requests.Orders.Queries.Get;
using SaM.AnyDeals.Application.Requests.Orders.Queries.GetMy;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class OrdersController : ApiControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync([FromRoute] int id, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetOrderByIdQuery(id), cancellationToken));

    [HttpGet("my")]
    public async Task<IActionResult> GetMyOrdersAsync([FromQuery] bool archivated = false, CancellationToken cancellationToken = default)
        => Ok(await Mediator.Send(new GetMyOrdersQuery(AsExecutor: false, Archivated: archivated), cancellationToken));

    [HttpGet("my/requests")]
    public async Task<IActionResult> GetMyRequestsAsync([FromQuery] bool archivated, CancellationToken cancellationToken = default)
        => Ok(await Mediator.Send(new GetMyOrdersQuery(AsExecutor: true, Archivated: archivated), cancellationToken));

    [HttpPost("create")]
    public async Task<IActionResult> CreateOrderAsync([FromBody] CreateOrderCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));

    [HttpPatch("approve")]
    public async Task<IActionResult> ApproveOrderAsync([FromBody] ApproveOrderCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));

    [HttpPatch("archivate")]
    public async Task<IActionResult> ArchiveOrderAsync([FromBody] ArchiveOrderCommand command, CancellationToken cancellactionToken)
        => Ok(await Mediator.Send(command, cancellactionToken));


}
