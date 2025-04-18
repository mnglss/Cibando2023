using System.ComponentModel.DataAnnotations;

namespace CibandoServer.Models
{
  public class User
  {
    [Key]
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public bool Accepted { get; set; } = true;
    public string Role { get; set; } = "User";
    public DateOnly CreatedAt { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public DateOnly UpdatedAt { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public DateOnly? DeletedAt { get; set; } = null;
    public DateOnly? LastLogin { get; set; } = null;


  }
}
