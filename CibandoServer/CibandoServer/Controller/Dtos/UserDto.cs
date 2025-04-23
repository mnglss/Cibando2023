namespace CibandoServer.Controller.Dtos
{
  public class UserDto
  {
    public required string Name { get; set; }
    public required string Email { get; set; }
    public string Password { get; set; } = string.Empty;
    public required bool Accepted { get; set; }
    public required string Role { get; set; }
    public string? CreatedAt { get; set; } = string.Empty;
    public string? UpdatedAt { get; set; } = string.Empty;
    public string? DeletedAt { get; set; } = string.Empty;
    public string? LastLogin { get; set; } = string.Empty;


  }
}
