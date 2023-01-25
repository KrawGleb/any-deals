using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class MessagesController : ApiControllerBase
{
    [HttpGet("orderId")]
    public async Task<IActionResult> GetChatMessagesAsync([FromRoute] int orderId, CancellationToken cancellationToken)
        => Ok();

    [HttpPost]
    public async Task<IActionResult> SendMessageAsnyc(CancellationToken cancellationToken)
        => Ok();
}
