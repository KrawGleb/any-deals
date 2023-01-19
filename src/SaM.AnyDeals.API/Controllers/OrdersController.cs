using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Orders.Commands.Approve;
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
    public async Task<IActionResult> GetMyOrdersAsync(CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetMyOrdersQuery(AsExecutor: false), cancellationToken));

    [HttpGet("my/requests")]
    public async Task<IActionResult> GetMyRequestsAsync(CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetMyOrdersQuery(AsExecutor: true), cancellationToken));

    [HttpPost("create")]
    public async Task<IActionResult> CreateOrderAsync([FromBody] CreateOrderCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));

    [HttpPut("approve")]
    public async Task<IActionResult> ApproveOrderAsync([FromBody] ApproveOrderCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));
}
