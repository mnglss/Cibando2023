namespace CibandoServer.Controller.Dtos
{
  public class UserLoginRequest
  {
    public required UserRequest User { get; set; }

    public class UserRequest
    {
    public required string Email { get; set; }
    public required string Password { get; set; }
    }
  }
}
