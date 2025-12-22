using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Municipal.Infrastructure;

public class MunicipalDbContextFactory : IDesignTimeDbContextFactory<MunicipalDbContext>
{
    public MunicipalDbContext CreateDbContext(string[] args)
    {
        // Keep this aligned with docker-compose + appsettings.Development.json
        var cs = Environment.GetEnvironmentVariable("MUNICIPAL_DB")
                 ?? "Host=127.0.0.1;Port=5433;Database=municipal;Username=postgres;Password=postgres";

        var options = new DbContextOptionsBuilder<MunicipalDbContext>()
            .UseNpgsql(cs)
            .Options;

        return new MunicipalDbContext(options);
    }
}
