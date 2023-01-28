using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Chat.Commands.Send;
using SaM.AnyDeals.Application.Requests.Chat.Queries.Get;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ChatController : ApiControllerBase
{
    [HttpGet("{orderId}")]
    public async Task<IActionResult> GetChatMessagesAsync([FromRoute] int orderId, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetChatMessagesQuery(orderId), cancellationToken));

    [HttpPost]
    public async Task<IActionResult> SendMessageAsnyc([FromBody] SendMessageCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));
}
