namespace CibandoServer.Controller.Dtos
{
  public class UserProfileRequest
  {
    public required ProfileRequest User { get; set; }

    public class ProfileRequest
    {
    public required string Email { get; set; }
    }
  }
}
