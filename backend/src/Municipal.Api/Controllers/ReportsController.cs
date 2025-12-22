using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Municipal.Infrastructure;
using Municipal.Infrastructure.Reports;

namespace Municipal.Api.Controllers;

[ApiController]
[Route("api/reports")]
public class ReportsController : ControllerBase
{
    private readonly MunicipalDbContext _db;

    public ReportsController(MunicipalDbContext db) => _db = db;

    [HttpGet("status-counts")]
    public async Task<ActionResult<IReadOnlyList<StatusCountDto>>> GetCountsByStatus()
    {
        var rows = await _db.Set<StatusCountDto>()
            .FromSqlRaw("SELECT * FROM sp_request_counts_by_status()")
            .AsNoTracking()
            .ToListAsync();

        return Ok(rows);
    }
}
