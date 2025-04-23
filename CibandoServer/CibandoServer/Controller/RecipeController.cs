using CibandoServer.Controller.Dtos;
using CibandoServer.Core.Interfaces;
using CibandoServer.Models;
using Microsoft.AspNetCore.Mvc;

namespace CibandoServer.Controller
{
  [ApiController]
  [Route("api/[controller]")]
  public class RecipeController : ControllerBase
  {
    private readonly IRecipeService _recipeService;

    public RecipeController(IRecipeService service)
    {
      _recipeService = service;
    }

    // GET: api/recipe
    [HttpGet]
    public async Task<IActionResult> GetAllRecipes()
    {
      return Ok(await _recipeService.GetAllAsync());
    }

    // GET: api/recipe/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRecipe(int id)
    {
      if (id <= 0)
      {
        return BadRequest("Recipe Id Not Valid");
      }
      var result = await _recipeService.GetByIdAsync(id);
      if (result == null)
      {
        return NotFound("Recipe not found.");
      }
      return Ok(result);
    }

    // POST: api/recipe
    [HttpPost]
    [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddRecipe([FromBody] RecipeRequest newRecipe)
    {
      try{
        // Validate the recipe object here if needed
        var recipe = new Recipe
        {
          Title = newRecipe.Recipe.Title,
          Description = newRecipe.Recipe.Description,
          Difficulty = newRecipe.Recipe.Difficulty,
          ImageUrl = newRecipe.Recipe.ImageUrl,
          IsPublished = newRecipe.Recipe.IsPublished,
          CreatedAt = DateOnly.FromDateTime(DateTime.Now)
        };
        await _recipeService.AddAsync(recipe);
        return Created();
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    // PUT: api/recipe/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRecipe(int id, [FromBody] Recipe updatedRecipe)
    {
      // Validate the recipe object here if needed
      if (id <= 0)
      {
        return BadRequest("Recipe Id Not Valid");
      }
      var existingRecipe = await _recipeService.GetByIdAsync(id);
      if (existingRecipe == null)
      {
        return NotFound("Recipe not found.");
      }
      await _recipeService.UpdateAsync(updatedRecipe);
      return Ok("Recipe updated successfully.");
    }

    // DELETE: api/recipe/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
      if (id <= 0)
      {
        return BadRequest("Recipe not found.");
      }

      await _recipeService.DeleteAsync(id);
      return Ok("Recipe deleted successfully.");
    }
  }
}
