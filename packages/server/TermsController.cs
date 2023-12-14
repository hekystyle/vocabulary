using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Vocabulary;

[Route("api/terms")]
[ApiController]
[Authorize]
public class TermsController(AppDbContext context, UserManager<AppUser> userManager) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Term>>> Find()
    {
        var user = await AppUser();

        return await context.Terms.Where(t => t.OwnerId == user.Id).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TermDTO>> GetById(long id)
    {
        var user = await AppUser();

        var term = await context.Terms.Where(t => t.OwnerId == user.Id).FirstOrDefaultAsync(t => t.Id == id);

        if (term == null)
        {
            return NotFound();
        }

        return Term.ToDTO(term);
    }

    [HttpPost]
    public async Task<ActionResult<TermDTO>> Create(CreateTermDTO dto)
    {
        var user = await AppUser();

        var entry = context.Terms.Add(Term.FromDTO(dto, user.Id));

        user.LastDataMutationAt = DateTime.UtcNow;

        await context.SaveChangesAsync();

        return CreatedAtAction("GetTerm", new { id = entry.Entity.Id }, Term.ToDTO(entry.Entity));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, UpdateTermDTO dto)
    {
        var user = await AppUser();

        var term = await context.Terms.Where(t => t.OwnerId == user.Id).FirstOrDefaultAsync(t => t.Id == id);

        if (term == null)
        {
            return NotFound();
        }

        if (term.Id != dto.Id)
        {
            return BadRequest("ID mismatch");
        }

        term.Word = dto.Word;

        user.LastDataMutationAt = DateTime.UtcNow;

        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TermExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTerm(long id)
    {
        var user = await AppUser();

        var term = await context.Terms.FindAsync(id);
        if (term == null)
        {
            return NotFound();
        }

        context.Terms.Remove(term);

        user.LastDataMutationAt = DateTime.UtcNow;

        await context.SaveChangesAsync();

        return NoContent();
    }

    private bool TermExists(long id)
    {
        return context.Terms.Any(e => e.Id == id);
    }

    private async Task<AppUser> AppUser()
    {
        var user = await userManager.GetUserAsync(User) ?? throw new BadHttpRequestException("", StatusCodes.Status401Unauthorized);

        return user;
    }
}

