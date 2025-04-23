
using CibandoServer.Models;

namespace CibandoServer.Core.Interfaces
{
  public interface IUserRepository
  {
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User?> GetUserAsync(string email, string Password);
    Task<bool> AddUserAsync(User user);
    Task UpdateUserAsync(User user);
    Task DeleteUserAsync(Guid userId);
    Task<User?> GetUserProfileAsync(string email);
  }
}
