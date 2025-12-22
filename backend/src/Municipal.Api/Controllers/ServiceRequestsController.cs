using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Municipal.Domain;
using Municipal.Infrastructure;

namespace Municipal.Api.Controllers;

[ApiController]
[Route("api/service-requests")]
public class ServiceRequestsController : ControllerBase
{
    private readonly MunicipalDbContext _db;

    public ServiceRequestsController(MunicipalDbContext db) => _db = db;

    [HttpPost]
    public async Task<ActionResult<ServiceRequest>> Create([FromBody] CreateRequestDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title) || dto.Title.Length > 120)
            return BadRequest("Title is required and must be <= 120 chars.");
        if (string.IsNullOrWhiteSpace(dto.Description) || dto.Description.Length > 2000)
            return BadRequest("Description is required and must be <= 2000 chars.");

        var req = new ServiceRequest
        {
            Category = dto.Category,
            Title = dto.Title.Trim(),
            Description = dto.Description.Trim(),
            Address = dto.Address?.Trim(),
            Latitude = dto.Latitude,
            Longitude = dto.Longitude
        };

        _db.ServiceRequests.Add(req);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = req.Id }, req);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ServiceRequest>> GetById(Guid id)
    {
        var req = await _db.ServiceRequests.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        return req is null ? NotFound() : Ok(req);
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<ServiceRequest>>> List(
        [FromQuery] RequestStatus? status,
        [FromQuery] RequestCategory? category,
        [FromQuery] string? q,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 5, 50);

        var query = _db.ServiceRequests.AsNoTracking().AsQueryable();

        if (status is not null) query = query.Where(x => x.Status == status);
        if (category is not null) query = query.Where(x => x.Category == category);

        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim().ToLower();
            query = query.Where(x =>
                x.Title.ToLower().Contains(term) ||
                x.Description.ToLower().Contains(term) ||
                (x.Address != null && x.Address.ToLower().Contains(term)));
        }

        var total = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return Ok(new PagedResult<ServiceRequest>(items, total, page, pageSize));
    }
}

public record CreateRequestDto(
    RequestCategory Category,
    string Title,
    string Description,
    string? Address,
    double? Latitude,
    double? Longitude
);

public record PagedResult<T>(IReadOnlyList<T> Items, int Total, int Page, int PageSize);
