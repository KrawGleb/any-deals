using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Payment.Commands.CreateIntent;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PaymentController : ApiControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreatePaymentIntent([FromBody] CreatePaymentIntentCommand command, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(command, cancellationToken));
}
