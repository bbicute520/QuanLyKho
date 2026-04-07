using Microsoft.EntityFrameworkCore;
using Inventory.Service.Models;

namespace Inventory.Service.Data
{
    public class WarehouseDbContext : DbContext
    {
        public WarehouseDbContext(DbContextOptions<WarehouseDbContext> options) : base(options) { }

        //Khai báo 5 DbSet tương ứng với 5 Model để Entity Framework tạo bảng trong CSDL
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ImportReceipt> ImportReceipts { get; set; }
        public DbSet<ExportReceipt> ExportReceipts { get; set; }
        public DbSet<StockTransaction> StockTransactions { get; set; }
    }
}