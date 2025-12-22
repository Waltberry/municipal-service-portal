using Microsoft.EntityFrameworkCore;
using Municipal.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", p =>
        p.WithOrigins("http://localhost:5173")
         .AllowAnyHeader()
         .AllowAnyMethod());
});

builder.Services.AddDbContext<MunicipalDbContext>(options =>
{
    var cs = builder.Configuration.GetConnectionString("MunicipalDb");
    options.UseNpgsql(cs); // <-- swap to UseSqlServer(cs) if SQL Server
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");
// app.UseCors("frontend");


app.MapControllers();

app.Run();
