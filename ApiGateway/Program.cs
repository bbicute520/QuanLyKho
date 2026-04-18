var builder = WebApplication.CreateBuilder(args);

// Đọc cấu hình YARP từ file yarp.json
builder.Configuration.AddJsonFile("yarp.json", optional: false, reloadOnChange: true);

var defaultAllowedOrigins = new[]
{
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:4173",
    "http://127.0.0.1:4173"
};

var configuredOriginsRaw = builder.Configuration["Cors:AllowedOrigins"];
var configuredAllowedOrigins = string.IsNullOrWhiteSpace(configuredOriginsRaw)
    ? Array.Empty<string>()
    : configuredOriginsRaw
        .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

var allowedOrigins = defaultAllowedOrigins
    .Concat(configuredAllowedOrigins)
    .Distinct(StringComparer.OrdinalIgnoreCase)
    .ToArray();

// Đăng ký YARP
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("frontend");

app.MapReverseProxy();

app.Run();