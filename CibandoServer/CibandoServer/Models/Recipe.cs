namespace CibandoServer.Models
{
  public class Recipe
  {
    public int Id { get; set; }
    public required string Title { get; set; }
    public string Description { get; set; } = string.Empty;
    public int Difficulty { get; set; }
    public DateOnly CreatedAt { get; set; } = new DateOnly();
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsPiblished { get; set; }
  }
}
