using Microsoft.EntityFrameworkCore;

namespace Supplier.Service.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Models.Supplier> Suppliers { get; set; }
    }
}