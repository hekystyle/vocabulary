
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace Vocabulary;

[Route("api/users")]
[Authorize]
public class UsersController(UserManager<AppUser> userManager) : ControllerBase
{
    [HttpGet("me")]
    public async Task<ActionResult<AppUser>> GetMe()
    {
        var user = await userManager.GetUserAsync(User);

        if (user == null)
        {
            return Unauthorized();
        }

        return user;
    }
}