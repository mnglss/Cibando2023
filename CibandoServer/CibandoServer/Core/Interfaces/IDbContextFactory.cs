using CibandoServer.Data;
namespace CibandoServer.Core.Interfaces
{
  public interface IDbContextFactory
  {
      CibandoDbContext CreateDbContextAsync();
  }
}
