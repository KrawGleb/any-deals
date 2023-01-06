using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Categories.Queries.Get;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ApiControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCategoriesAsync(CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetCategoriesQuery(), cancellationToken));
}
