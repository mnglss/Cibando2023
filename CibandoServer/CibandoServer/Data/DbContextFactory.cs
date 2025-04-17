using CibandoServer.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CibandoServer.Data
{
  public class DbContextFactory : IDbContextFactory
  {
      private readonly IConfiguration _configuration;

      public DbContextFactory(IConfiguration configuration)
      {
          _configuration = configuration;
      }

    public CibandoDbContext CreateDbContextAsync()
    {
      var optionsBuilder = new DbContextOptionsBuilder<CibandoDbContext>();
          //var connectionString = _configuration.GetConnectionString("AMWebAppConnStringLocal");
          optionsBuilder.UseSqlServer(_configuration.GetConnectionString("CibandoServerContext"), o => o.EnableRetryOnFailure());
          return new CibandoDbContext(optionsBuilder.Options);
    }
  }
}
