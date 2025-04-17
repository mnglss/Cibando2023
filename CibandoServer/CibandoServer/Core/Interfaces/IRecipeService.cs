using CibandoServer.Models;
namespace CibandoServer.Core.Interfaces
{
  public interface IRecipeService
  {
      Task<IEnumerable<Recipe>> GetAllAsync();
      Task<Recipe?> GetByIdAsync(int id);
      Task AddAsync(Recipe recipe);
      Task UpdateAsync(Recipe recipe);
      Task DeleteAsync(int id);
  }
}
