using CibandoServer.Core.Interfaces;
using CibandoServer.Models;
using Microsoft.AspNetCore.Mvc;
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
      var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == Password);
      if (user is not null)
      {
        user.LastLogin = DateOnly.FromDateTime(DateTime.UtcNow); // Update the last login time
        await UpdateUserAsync(user);// Update the user in the database
      }
      return user;
    }

    public Task<User?> GetUserProfileAsync(string email)
    {
      var dbContext = _dbContextFactory.CreateDbContextAsync();
      return dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task UpdateUserAsync(User user)
    {
      var dbContext = _dbContextFactory.CreateDbContextAsync();
      dbContext.Users.Update(user);
      await dbContext.SaveChangesAsync();
    }
  }
}
