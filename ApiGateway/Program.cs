var builder = WebApplication.CreateBuilder(args);

// Đọc cấu hình YARP từ file yarp.json
builder.Configuration.AddJsonFile("yarp.json", optional: false, reloadOnChange: true);

// Đăng ký YARP
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:4173",
                "http://127.0.0.1:4173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("frontend");

app.MapReverseProxy();

app.Run();