namespace Municipal.Domain;

public class ServiceRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public RequestCategory Category { get; set; }
    public RequestStatus Status { get; set; } = RequestStatus.Submitted;

    public string Title { get; set; } = "";
    public string Description { get; set; } = "";

    public string? Address { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; set; }
}
