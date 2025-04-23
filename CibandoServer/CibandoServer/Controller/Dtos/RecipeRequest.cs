namespace CibandoServer.Controller.Dtos
{
  public class RecipeRequest
  {
    public required RecipeDto Recipe { get; set; }

    public class RecipeDto
    {
      public required string Title { get; set; }
      public string Description { get; set; } = string.Empty;
      public int Difficulty { get; set; }
      public string ImageUrl { get; set; } = string.Empty;
      public bool IsPublished { get; set; }
    }
  }
}
