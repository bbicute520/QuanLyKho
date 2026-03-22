var builder = WebApplication.CreateBuilder(args);

// Đọc cấu hình YARP từ file yarp.json
builder.Configuration.AddJsonFile("yarp.json", optional: false, reloadOnChange: true);

// Đăng ký YARP
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

app.MapReverseProxy();

app.Run();