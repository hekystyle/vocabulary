using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;

namespace Vocabulary;

public class CreateTermDTO
{
    public string Word { get; set; } = null!;
}

public class UpdateTermDTO : CreateTermDTO
{
    public long Id { get; set; }
}

public class Term
{
    public ObjectId Id { get; set; }
    public string Word { get; set; } = string.Empty;
    public string OwnerId { get; set; } = string.Empty;
    // public AppUser Owner { get; set; } = null!;

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime UpdatedAt { get; set; }

    public static Term FromDTO(CreateTermDTO dto, string ownerId) => new () {
        Word = dto.Word,
        OwnerId = ownerId
    };

    public static TermDTO ToDTO(Term term) => new () {
        Id = term.Id,
        Word = term.Word,
        CreatedAt = term.CreatedAt,
        UpdatedAt = term.UpdatedAt,
        OwnerId = term.OwnerId
    };
}

public class TermDTO
{
    public ObjectId Id { get; set; }
    public string Word { get; set; } = string.Empty;
    public string OwnerId { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}