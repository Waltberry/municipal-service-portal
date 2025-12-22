using Microsoft.EntityFrameworkCore;

namespace Municipal.Infrastructure.Reports;

[Keyless]
public class StatusCountDto
{
    public int Status { get; set; }
    public long Count { get; set; }
}
