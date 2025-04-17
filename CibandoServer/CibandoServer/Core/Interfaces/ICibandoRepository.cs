using CibandoServer.Models;
namespace CibandoServer.Core.Interfaces
{
  public interface ICibandoRepository
  {
      Task<IEnumerable<Recipe>> GetAllAsync();
      Task<Recipe?> GetByIdAsync(int id);
      Task AddAsync(Recipe entity);
      Task UpdateAsync(Recipe entity);
      Task DeleteAsync(int id);
  }
}
