using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Application.Requests.Countries.Queries.Get;
using SaM.AnyDeals.Application.Requests.Countries.Queries.GetCities;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CountriesController : ApiControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCountriesAsync(CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetCountriesQuery(), cancellationToken));

    [HttpGet("{countryId}")]
    public async Task<IActionResult> GetCitiesAsync([FromRoute] int countryId, CancellationToken cancellationToken)
        => Ok(await Mediator.Send(new GetCitiesQuery(countryId), cancellationToken));
}
