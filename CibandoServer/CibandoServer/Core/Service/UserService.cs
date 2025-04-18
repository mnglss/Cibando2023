using CibandoServer.Core.Interfaces;
using CibandoServer.Models;

namespace CibandoServer.Core.Service
{
  public class UserService : IUserService
  {
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
      _userRepository = userRepository;
    }

    // Implement the methods defined in the IUsersService interface here
    public async Task<bool> CreateUserAsync(User user)
    {
      try{
      // Validate the user object here if needed
      if (await _userRepository.GetUserAsync(user.Email, user.Password)!= null)
        return false;

      user.Id = Guid.NewGuid(); // Generate a new GUID for the user ID
      await _userRepository.AddUserAsync(user);
      return true;
      }
      catch (Exception ex)
      {
        // Handle exceptions as needed (e.g., log the error)
        return false;
      }
    }

    public async Task<bool> DeleteUserAsync(int userId)
    {
      throw new NotImplementedException();
    }

    public async Task<User?> GetUserAsync(string email, string Password)
    {
      return await _userRepository.GetUserAsync(email, Password);
    }

    public async Task<bool> UpdateUserAsync(User user)
    {
      throw new NotImplementedException();
    }
  }
}
