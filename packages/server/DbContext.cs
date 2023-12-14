using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Vocabulary;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public DbSet<Term> Terms { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
    }
}