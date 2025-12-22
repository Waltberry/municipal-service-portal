namespace Municipal.Domain;

public enum RequestStatus
{
    Submitted = 0,
    InReview = 1,
    InProgress = 2,
    Resolved = 3,
    Rejected = 4
}

public enum RequestCategory
{
    Pothole = 0,
    Garbage = 1,
    Streetlight = 2,
    WaterLeak = 3,
    Graffiti = 4,
    Other = 5
}
