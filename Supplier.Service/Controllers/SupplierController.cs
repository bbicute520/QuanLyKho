using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Supplier.Service.Data;
using Supplier.Service.DTOs;
using Supplier.Service.Models;
using Supplier.Service.Services;

namespace Supplier.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SupplierController : ControllerBase
    {
        private readonly SupplierDbContext _context;
        private readonly InventoryAnalyticsClient _inventoryAnalyticsClient;

        public SupplierController(SupplierDbContext context, InventoryAnalyticsClient inventoryAnalyticsClient)
        {
            _context = context;
            _inventoryAnalyticsClient = inventoryAnalyticsClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search)
        {
            var query = _context.Suppliers.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var keyword = search.Trim().ToLower();
                query = query.Where(x =>
                    x.Name.ToLower().Contains(keyword) ||
                    (x.ContactPerson != null && x.ContactPerson.ToLower().Contains(keyword)) ||
                    (x.Phone != null && x.Phone.Contains(keyword)) ||
                    (x.Email != null && x.Email.ToLower().Contains(keyword)));
            }

            var suppliers = await query
                .OrderBy(x => x.Name)
                .ToListAsync();

            return Ok(suppliers);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null)
            {
                return NotFound("Không tìm thấy nhà cung cấp.");
            }

            return Ok(supplier);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ThuKho")]
        public async Task<IActionResult> Create([FromBody] CreateSupplierRequest request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var exists = await _context.Suppliers.AnyAsync(x => x.Name == request.Name.Trim());
            if (exists)
            {
                return BadRequest("Tên nhà cung cấp đã tồn tại.");
            }

            var supplier = new SupplierInfo
            {
                Name = request.Name.Trim(),
                ContactPerson = request.ContactPerson,
                Phone = request.Phone,
                Email = request.Email,
                Address = request.Address,
                IsActive = request.IsActive,
                CreatedAt = DateTime.UtcNow
            };

            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = supplier.Id }, supplier);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin,ThuKho")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSupplierRequest request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null)
            {
                return NotFound("Không tìm thấy nhà cung cấp.");
            }

            supplier.Name = request.Name.Trim();
            supplier.ContactPerson = request.ContactPerson;
            supplier.Phone = request.Phone;
            supplier.Email = request.Email;
            supplier.Address = request.Address;
            supplier.IsActive = request.IsActive;

            await _context.SaveChangesAsync();
            return Ok(supplier);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin,ThuKho")]
        public async Task<IActionResult> Delete(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null)
            {
                return NotFound("Không tìm thấy nhà cung cấp.");
            }

            _context.Suppliers.Remove(supplier);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("analytics")]
        [Authorize(Roles = "Admin,ThuKho,KeToan")]
        public async Task<IActionResult> GetAnalytics([FromQuery] int limit = 2000, CancellationToken cancellationToken = default)
        {
            var safeLimit = Math.Clamp(limit, 1, 5000);
            var bearerToken = ResolveBearerToken();
            var history = await _inventoryAnalyticsClient.GetHistoryAsync(safeLimit, bearerToken, cancellationToken);

            var importTransactions = history
                .Where(item => IsImport(item) && item.SupplierId.HasValue)
                .ToList();

            var grouped = importTransactions
                .GroupBy(item => item.SupplierId!.Value)
                .ToDictionary(group => group.Key, group => group.ToList());

            var suppliers = await _context.Suppliers
                .OrderBy(x => x.Name)
                .ToListAsync(cancellationToken);

            foreach (var supplier in suppliers)
            {
                if (!grouped.TryGetValue(supplier.Id, out var supplierTransactions))
                {
                    supplier.TotalTransactions = 0;
                    supplier.TotalImportValue = 0;
                    supplier.ReliabilityScore = supplier.IsActive ? 50 : 25;
                    supplier.LastTransactionAt = null;
                    continue;
                }

                supplier.TotalTransactions = supplierTransactions.Count;
                supplier.TotalImportValue = supplierTransactions.Sum(ResolveAmount);
                supplier.LastTransactionAt = supplierTransactions.Max(ResolveDate);
                supplier.ReliabilityScore = CalculateReliabilityScore(supplier, supplierTransactions);
            }

            await _context.SaveChangesAsync(cancellationToken);

            var payload = suppliers.Select(supplier => new
            {
                supplier.Id,
                supplier.Name,
                supplier.ContactPerson,
                supplier.Phone,
                supplier.Email,
                supplier.IsActive,
                supplier.TotalTransactions,
                supplier.TotalImportValue,
                supplier.ReliabilityScore,
                supplier.LastTransactionAt
            });

            return Ok(payload);
        }

        private string? ResolveBearerToken()
        {
            var authHeader = Request.Headers.Authorization.ToString();
            if (!string.IsNullOrWhiteSpace(authHeader))
            {
                return authHeader;
            }

            if (Request.Cookies.TryGetValue("access_token", out var cookieToken) && !string.IsNullOrWhiteSpace(cookieToken))
            {
                return $"Bearer {cookieToken}";
            }

            return null;
        }

        private static bool IsImport(InventoryHistoryDto item)
        {
            var type = ResolveType(item);
            return type.Contains("IMPORT", StringComparison.OrdinalIgnoreCase);
        }

        private static string ResolveType(InventoryHistoryDto item)
        {
            if (!string.IsNullOrWhiteSpace(item.Type))
            {
                return item.Type;
            }

            return item.TransactionType;
        }

        private static DateTime ResolveDate(InventoryHistoryDto item)
        {
            if (item.Date != default)
            {
                return item.Date;
            }

            return item.TransactionDate;
        }

        private static decimal ResolveAmount(InventoryHistoryDto item)
        {
            if (item.TotalAmount > 0)
            {
                return item.TotalAmount;
            }

            if (item.UnitPrice <= 0 || item.Quantity <= 0)
            {
                return 0;
            }

            return item.UnitPrice * item.Quantity;
        }

        private static decimal CalculateReliabilityScore(SupplierInfo supplier, IReadOnlyCollection<InventoryHistoryDto> transactions)
        {
            var count = transactions.Count;
            var totalValue = transactions.Sum(ResolveAmount);
            var lastDate = transactions.Max(ResolveDate);
            var ageDays = (DateTime.UtcNow - lastDate).TotalDays;

            var activityScore = Math.Min(50m, count * 2m);
            var valueScore = Math.Min(30m, totalValue / 100_000_000m * 30m);
            var recencyScore = ageDays <= 30 ? 20m : ageDays <= 90 ? 12m : 6m;

            var score = activityScore + valueScore + recencyScore;
            if (!supplier.IsActive)
            {
                score *= 0.5m;
            }

            return decimal.Round(Math.Clamp(score, 0, 100), 2);
        }
    }
}
