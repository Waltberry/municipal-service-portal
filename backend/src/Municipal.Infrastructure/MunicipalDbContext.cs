using Microsoft.EntityFrameworkCore;
using Municipal.Domain;
using Municipal.Infrastructure.Reports;

namespace Municipal.Infrastructure;

public class MunicipalDbContext : DbContext
{
    public MunicipalDbContext(DbContextOptions<MunicipalDbContext> options) : base(options) {}

    public DbSet<ServiceRequest> ServiceRequests => Set<ServiceRequest>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ServiceRequest>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Title).HasMaxLength(120).IsRequired();
            e.Property(x => x.Description).HasMaxLength(2000).IsRequired();
            e.Property(x => x.Address).HasMaxLength(200);

            e.Property(x => x.Status).HasConversion<int>();
            e.Property(x => x.Category).HasConversion<int>();

            e.HasIndex(x => x.CreatedAt);
            e.HasIndex(x => x.Status);
            e.HasIndex(x => x.Category);
        });

        // Keyless report projection
        modelBuilder.Entity<StatusCountDto>().HasNoKey();
    }
}
