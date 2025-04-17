using CibandoServer.Core.Interfaces;
using CibandoServer.Models;

namespace CibandoServer.Core.Services
{

  public class RecipeService : IRecipeService
  {
      private readonly ICibandoRepository _repository;

    public RecipeService(ICibandoRepository repository)
    {
      _repository = repository;
    }

    public async Task AddAsync(Recipe recipe)
    {
      await _repository.AddAsync(recipe);
    }

    public async Task DeleteAsync(int id)
    {
      await _repository.DeleteAsync(id);
    }

    public async Task<IEnumerable<Recipe>> GetAllAsync()
    {
      return await _repository.GetAllAsync();
    }

    public async Task<Recipe?> GetByIdAsync(int id)
    {
      return await _repository.GetByIdAsync(id);
    }

    public async Task UpdateAsync(Recipe recipe)
    {
      await _repository.UpdateAsync(recipe);
    }
  }
}
