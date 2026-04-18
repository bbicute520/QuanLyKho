using Microsoft.EntityFrameworkCore;
using Supplier.Service.Models;

namespace Supplier.Service.Data
{
    public class SupplierDbContext : DbContext
    {
        public SupplierDbContext(DbContextOptions<SupplierDbContext> options) : base(options)
        {
        }

        public DbSet<SupplierInfo> Suppliers => Set<SupplierInfo>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SupplierInfo>()
                .Property(x => x.TotalImportValue)
                .HasPrecision(18, 2);

            modelBuilder.Entity<SupplierInfo>()
                .Property(x => x.ReliabilityScore)
                .HasPrecision(18, 2);

            modelBuilder.Entity<SupplierInfo>()
                .HasIndex(x => x.Name);

            modelBuilder.Entity<SupplierInfo>().HasData(
                new SupplierInfo
                {
                    Id = 1,
                    Name = "Công ty ABC",
                    ContactPerson = "Nguyễn Văn A",
                    Phone = "0900000001",
                    Email = "abc@demo.com",
                    Address = "Hà Nội",
                    IsActive = true,
                    CreatedAt = new DateTime(2026, 4, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new SupplierInfo
                {
                    Id = 2,
                    Name = "Công ty XYZ",
                    ContactPerson = "Trần Thị B",
                    Phone = "0900000002",
                    Email = "xyz@demo.com",
                    Address = "TP HCM",
                    IsActive = true,
                    CreatedAt = new DateTime(2026, 4, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );
        }
    }
}
