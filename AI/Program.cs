var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// HTTP client
var inventoryBaseUrl = builder.Configuration["InventoryService:BaseUrl"] ?? "http://inventory-service";
builder.Services.AddHttpClient<InventoryClient>(c =>
{
    c.BaseAddress = new Uri(inventoryBaseUrl);
});

builder.Services.AddHttpClient<AIService>();

var app = builder.Build();

app.MapControllers();

app.Run();