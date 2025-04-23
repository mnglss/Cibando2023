namespace CibandoServer.Controller.Dtos
{
  public class UserLoginRequest
  {
    public required LoginRequest User { get; set; }

    public class LoginRequest
    {
    public required string Email { get; set; }
    public required string Password { get; set; }
    }
  }
}
