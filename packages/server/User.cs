
using Microsoft.AspNetCore.Identity;

namespace Vocabulary;

public class AppUser : IdentityUser
{
    public DateTime? LastDataMutationAt { get; set; } = null;

    public ICollection<Term> Terms { get; set; } = null!;
}
