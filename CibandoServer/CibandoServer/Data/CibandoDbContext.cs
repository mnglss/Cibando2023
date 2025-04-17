using CibandoServer.Models;
using Microsoft.EntityFrameworkCore;

namespace CibandoServer.Data
{
  public class CibandoDbContext : DbContext
  {
    public CibandoDbContext(DbContextOptions<CibandoDbContext> options)
      : base(options)
    {
    }

    // Define your DbSet properties here
    // Example:
    // public DbSet<EntityName> EntityNames { get; set; }
    public DbSet<User> Users { get; set; } = null!; // Initialize with null to avoid nullability warnings
    public DbSet<Recipe> Recipes { get; set; } = null!; // Initialize with null to avoid nullability warnings

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Configure entity relationships and constraints here
      // Example:
      // modelBuilder.Entity<EntityName>().HasKey(e => e.Id);
    }
  }
}
