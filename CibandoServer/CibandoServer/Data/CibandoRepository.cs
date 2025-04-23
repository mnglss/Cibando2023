using CibandoServer.Core.Interfaces;
using CibandoServer.Models;
using Microsoft.EntityFrameworkCore;

namespace CibandoServer.Data
{
  public class CibandoRepository : ICibandoRepository
  {
    private readonly IDbContextFactory _dbContextFactory;


      public CibandoRepository(IDbContextFactory dbContextFactory)
      {
          _dbContextFactory = dbContextFactory;
      }

      public async Task<IEnumerable<Recipe>> GetAllAsync()
      {
        using var dbContext = _dbContextFactory.CreateDbContextAsync();
        var recipes = await dbContext.Recipes.Where(r => r.IsPublished).ToListAsync();
        if (recipes == null || recipes.Count == 0)
          return [];
        return recipes;
    }

      public async Task<Recipe?> GetByIdAsync(int id)
      {
        using var dbContext = _dbContextFactory.CreateDbContextAsync();
        return await dbContext.Recipes.FirstAsync(r => r.Id == id);
    }

      public async Task AddAsync(Recipe entity)
      {
        using var dbContext = _dbContextFactory.CreateDbContextAsync();
        await dbContext.Recipes.AddAsync(entity);
        await dbContext.SaveChangesAsync();
      }

      public async Task UpdateAsync(Recipe entity)
      {
        using var dbContext = _dbContextFactory.CreateDbContextAsync();
        dbContext.Recipes.Update(entity);
        await dbContext.SaveChangesAsync();
      }

      public async Task DeleteAsync(int id)
      {
        using var dbContext = _dbContextFactory.CreateDbContextAsync();
        var recipe = await GetByIdAsync(id);
        if (recipe != null)
        {
          //dbContext.Recipes.Remove(recipe); // Elimina dal DB
          recipe.IsPublished = false; // Imposta lo stato dell'oggetto a "Deleted"
          dbContext.Recipes.Update(recipe); // Aggiorna lo stato dell'oggetto a "Deleted"
          await dbContext.SaveChangesAsync();
        }
      }
  }
}
