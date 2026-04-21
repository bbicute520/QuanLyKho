using Inventory.Service.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<WarehouseDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Inventory.Service API", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Nhập token theo format: Bearer {token}"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrWhiteSpace(jwtKey) || jwtKey.Length < 32)
{
    throw new InvalidOperationException("Jwt:Key phải có tối thiểu 32 ký tự trong appsettings.");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                if (string.IsNullOrEmpty(context.Token) &&
                    context.Request.Cookies.TryGetValue("access_token", out var cookieToken))
                {
                    context.Token = cookieToken;
                }

                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("InventoryWrite", policy => policy.RequireRole("Admin", "ThuKho"));
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<WarehouseDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger("DatabaseMigration");

    const int maxAttempts = 10;
    for (var attempt = 1; attempt <= maxAttempts; attempt++)
    {
        try
        {
            db.Database.Migrate();
            db.Database.ExecuteSqlRaw(@"
IF COL_LENGTH('ImportReceipts', 'EmployeeId') IS NULL
    ALTER TABLE ImportReceipts ADD EmployeeId INT NOT NULL CONSTRAINT DF_ImportReceipts_EmployeeId DEFAULT (0);

IF COL_LENGTH('ImportReceipts', 'EmployeeName') IS NULL
    ALTER TABLE ImportReceipts ADD EmployeeName NVARCHAR(100) NOT NULL CONSTRAINT DF_ImportReceipts_EmployeeName DEFAULT ('');

IF COL_LENGTH('ExportReceipts', 'EmployeeId') IS NULL
    ALTER TABLE ExportReceipts ADD EmployeeId INT NOT NULL CONSTRAINT DF_ExportReceipts_EmployeeId DEFAULT (0);

IF COL_LENGTH('ExportReceipts', 'EmployeeName') IS NULL
    ALTER TABLE ExportReceipts ADD EmployeeName NVARCHAR(100) NOT NULL CONSTRAINT DF_ExportReceipts_EmployeeName DEFAULT ('');

IF COL_LENGTH('StockTransactions', 'EmployeeId') IS NULL
    ALTER TABLE StockTransactions ADD EmployeeId INT NOT NULL CONSTRAINT DF_StockTransactions_EmployeeId DEFAULT (0);

IF COL_LENGTH('StockTransactions', 'EmployeeName') IS NULL
    ALTER TABLE StockTransactions ADD EmployeeName NVARCHAR(100) NOT NULL CONSTRAINT DF_StockTransactions_EmployeeName DEFAULT ('');

IF COL_LENGTH('ImportReceipts', 'EmployeeId') IS NOT NULL
    EXEC(N'UPDATE ImportReceipts SET EmployeeId = 1 WHERE EmployeeId <= 0;');

IF COL_LENGTH('ImportReceipts', 'EmployeeName') IS NOT NULL
    EXEC(N'UPDATE ImportReceipts SET EmployeeName = N''LegacyUser'' WHERE LEN(LTRIM(RTRIM(EmployeeName))) = 0;');

IF COL_LENGTH('ExportReceipts', 'EmployeeId') IS NOT NULL
    EXEC(N'UPDATE ExportReceipts SET EmployeeId = 1 WHERE EmployeeId <= 0;');

IF COL_LENGTH('ExportReceipts', 'EmployeeName') IS NOT NULL
    EXEC(N'UPDATE ExportReceipts SET EmployeeName = N''LegacyUser'' WHERE LEN(LTRIM(RTRIM(EmployeeName))) = 0;');

IF COL_LENGTH('StockTransactions', 'EmployeeId') IS NOT NULL
    EXEC(N'UPDATE StockTransactions SET EmployeeId = 1 WHERE EmployeeId <= 0;');

IF COL_LENGTH('StockTransactions', 'EmployeeName') IS NOT NULL
    EXEC(N'UPDATE StockTransactions SET EmployeeName = N''LegacyUser'' WHERE LEN(LTRIM(RTRIM(EmployeeName))) = 0;');

IF NOT EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_ImportReceipts_EmployeeId')
    EXEC(N'ALTER TABLE ImportReceipts ADD CONSTRAINT CK_ImportReceipts_EmployeeId CHECK (EmployeeId > 0);');

IF NOT EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_ImportReceipts_EmployeeName')
    EXEC(N'ALTER TABLE ImportReceipts ADD CONSTRAINT CK_ImportReceipts_EmployeeName CHECK (LEN(LTRIM(RTRIM(EmployeeName))) > 0);');

IF NOT EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_ExportReceipts_EmployeeId')
    EXEC(N'ALTER TABLE ExportReceipts ADD CONSTRAINT CK_ExportReceipts_EmployeeId CHECK (EmployeeId > 0);');

IF NOT EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_ExportReceipts_EmployeeName')
    EXEC(N'ALTER TABLE ExportReceipts ADD CONSTRAINT CK_ExportReceipts_EmployeeName CHECK (LEN(LTRIM(RTRIM(EmployeeName))) > 0);');

IF NOT EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_StockTransactions_EmployeeId')
    EXEC(N'ALTER TABLE StockTransactions ADD CONSTRAINT CK_StockTransactions_EmployeeId CHECK (EmployeeId > 0);');

IF NOT EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'CK_StockTransactions_EmployeeName')
    EXEC(N'ALTER TABLE StockTransactions ADD CONSTRAINT CK_StockTransactions_EmployeeName CHECK (LEN(LTRIM(RTRIM(EmployeeName))) > 0);');

");
            logger.LogInformation("WarehouseDb migration completed.");
            break;
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "WarehouseDb migration attempt {Attempt}/{MaxAttempts} failed.", attempt, maxAttempts);

            if (attempt == maxAttempts)
            {
                throw;
            }

            Thread.Sleep(TimeSpan.FromSeconds(5));
        }
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

// THÊM CORS (Đã hướng dẫn ở phần trước)
app.UseCors("AllowAll");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
