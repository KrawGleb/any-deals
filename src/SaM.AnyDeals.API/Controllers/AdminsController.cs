using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaM.AnyDeals.Common.Enums.Auth;

namespace SaM.AnyDeals.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = RolesEnum.Admin)]
public class AdminsController : ApiControllerBase
{
}
