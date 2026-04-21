using Microsoft.EntityFrameworkCore;
using Inventory.Service.Models;

namespace Inventory.Service.Data
{
    public class WarehouseDbContext : DbContext
    {
        public WarehouseDbContext(DbContextOptions<WarehouseDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ImportReceipt> ImportReceipts { get; set; }
        public DbSet<ExportReceipt> ExportReceipts { get; set; }
        public DbSet<StockTransaction> StockTransactions { get; set; }

        // Thêm khối lệnh này để Seed Data
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<StockTransaction>()
                .Property(x => x.UnitPrice)
                .HasPrecision(18, 2);

            modelBuilder.Entity<ImportReceipt>()
                .ToTable(tb =>
                {
                    tb.HasCheckConstraint("CK_ImportReceipts_EmployeeId", "[EmployeeId] > 0");
                    tb.HasCheckConstraint("CK_ImportReceipts_EmployeeName", "LEN(LTRIM(RTRIM([EmployeeName]))) > 0");
                });

            modelBuilder.Entity<ExportReceipt>()
                .ToTable(tb =>
                {
                    tb.HasCheckConstraint("CK_ExportReceipts_EmployeeId", "[EmployeeId] > 0");
                    tb.HasCheckConstraint("CK_ExportReceipts_EmployeeName", "LEN(LTRIM(RTRIM([EmployeeName]))) > 0");
                });

            modelBuilder.Entity<StockTransaction>()
                .ToTable(tb =>
                {
                    tb.HasCheckConstraint("CK_StockTransactions_EmployeeId", "[EmployeeId] > 0");
                    tb.HasCheckConstraint("CK_StockTransactions_EmployeeName", "LEN(LTRIM(RTRIM([EmployeeName]))) > 0");
                });

            // Seed data cho Category
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Điện tử" },
                new Category { Id = 2, Name = "Gia dụng" },
                new Category { Id = 3, Name = "Thực phẩm" }
            );

            // Seed data cho Product (20 san pham mau phuc vu frontend/test)
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Laptop Dell XPS 15", Category = "Điện tử", Unit = "Cái", Stock = 50, MinStock = 10 },
                new Product { Id = 2, Name = "Bàn phím cơ Logitech", Category = "Điện tử", Unit = "Cái", Stock = 120, MinStock = 20 },
                new Product { Id = 3, Name = "Nồi chiên không dầu", Category = "Gia dụng", Unit = "Cái", Stock = 30, MinStock = 5 },
                new Product { Id = 4, Name = "Nước mắm Nam Ngư", Category = "Thực phẩm", Unit = "Chai", Stock = 500, MinStock = 50 },
                new Product { Id = 5, Name = "Chuột không dây Microsoft", Category = "Điện tử", Unit = "Cái", Stock = 85, MinStock = 15 },
                new Product { Id = 6, Name = "Tai nghe Sony WH-CH520", Category = "Điện tử", Unit = "Cái", Stock = 40, MinStock = 8 },
                new Product { Id = 7, Name = "Sạc dự phòng Anker 20000mAh", Category = "Điện tử", Unit = "Cái", Stock = 65, MinStock = 12 },
                new Product { Id = 8, Name = "Ấm siêu tốc Philips", Category = "Gia dụng", Unit = "Cái", Stock = 55, MinStock = 10 },
                new Product { Id = 9, Name = "Máy hút bụi cầm tay", Category = "Gia dụng", Unit = "Cái", Stock = 22, MinStock = 5 },
                new Product { Id = 10, Name = "Nồi cơm điện Sharp", Category = "Gia dụng", Unit = "Cái", Stock = 48, MinStock = 8 },
                new Product { Id = 11, Name = "Bột giặt OMO 3kg", Category = "Gia dụng", Unit = "Gói", Stock = 140, MinStock = 25 },
                new Product { Id = 12, Name = "Mì ăn liền Hảo Hảo", Category = "Thực phẩm", Unit = "Thùng", Stock = 260, MinStock = 40 },
                new Product { Id = 13, Name = "Gạo ST25", Category = "Thực phẩm", Unit = "Bao", Stock = 180, MinStock = 30 },
                new Product { Id = 14, Name = "Dầu ăn Neptune", Category = "Thực phẩm", Unit = "Chai", Stock = 210, MinStock = 35 },
                new Product { Id = 15, Name = "Sữa tươi Vinamilk", Category = "Thực phẩm", Unit = "Lốc", Stock = 320, MinStock = 60 },
                new Product { Id = 16, Name = "Đường Biên Hòa", Category = "Thực phẩm", Unit = "Kg", Stock = 175, MinStock = 25 },
                new Product { Id = 17, Name = "Nước rửa chén Sunlight", Category = "Gia dụng", Unit = "Chai", Stock = 110, MinStock = 20 },
                new Product { Id = 18, Name = "Bóng đèn LED Rạng Đông", Category = "Điện tử", Unit = "Bóng", Stock = 95, MinStock = 18 },
                new Product { Id = 19, Name = "Ổ cắm điện Lioa", Category = "Điện tử", Unit = "Cái", Stock = 70, MinStock = 12 },
                new Product { Id = 20, Name = "Khăn giấy Pulppy", Category = "Gia dụng", Unit = "Gói", Stock = 240, MinStock = 40 }
            );
        }
    }
}