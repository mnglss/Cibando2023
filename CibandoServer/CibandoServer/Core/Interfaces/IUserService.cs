using CibandoServer.Models;

namespace CibandoServer.Core.Interfaces
{
  public interface IUserService
  {
    Task<User?> GetUserAsync(string email, string Password);
    Task<bool> CreateUserAsync(User user);
    Task<bool> UpdateUserAsync(User user);
    Task<bool> DeleteUserAsync(int userId);
  }
}
