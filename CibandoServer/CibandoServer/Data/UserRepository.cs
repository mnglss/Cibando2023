using CibandoServer.Core.Interfaces;
using CibandoServer.Models;
using Microsoft.EntityFrameworkCore;

namespace CibandoServer.Data
{
  public class UserRepository : IUserRepository
  {
    private readonly IDbContextFactory _dbContextFactory;

    public UserRepository(IDbContextFactory dbContextFactory)
    {
      _dbContextFactory = dbContextFactory;
    }

    public async Task<bool> AddUserAsync(User user)
    {
      try
      {
      using var dbContext = _dbContextFactory.CreateDbContextAsync();
      dbContext.Users.Add(user);
      await dbContext.SaveChangesAsync();
      return true;
      }
      catch (System.Exception)
      {
        return false;
      }
    }

    public Task DeleteUserAsync(Guid userId)
    {
      throw new NotImplementedException();
    }

    public Task<IEnumerable<User>> GetAllUsersAsync()
    {
      throw new NotImplementedException();
    }

    public async Task<User?> GetUserAsync(string email, string Password)
    {
      using var dbContext = _dbContextFactory.CreateDbContextAsync();
      return await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == Password);
    }

    public Task UpdateUserAsync(User user)
    {
      throw new NotImplementedException();
    }
  }
}
