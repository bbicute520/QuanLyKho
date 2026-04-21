using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Inventory.Service.Data;
using Inventory.Service.DTOs;
using Inventory.Service.Models;

namespace Inventory.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InventoryController : ControllerBase
    {
        private readonly WarehouseDbContext _context;

        public InventoryController(WarehouseDbContext context)
        {
            _context = context;
        }

        // GET: api/inventory/stock
        [HttpGet("stock")]
        public async Task<IActionResult> GetStock()
        {
            var stockList = await _context.Products
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Category,
                    p.Stock,
                    p.MinStock,
                    IsLowStock = p.Stock < p.MinStock
                })
                .ToListAsync();

            return Ok(stockList);
        }

        // GET: api/inventory/history?limit=200
        [HttpGet("history")]
        public async Task<IActionResult> GetHistory([FromQuery] int limit = 200)
        {
            var safeLimit = Math.Clamp(limit, 1, 5000);

            var rawHistory = await _context.StockTransactions
                .AsNoTracking()
                .OrderByDescending(t => t.TransactionDate)
                .Take(safeLimit)
                .Join(
                    _context.Products.AsNoTracking(),
                    t => t.ProductId,
                    p => p.Id,
                    (t, p) => new
                    {
                        id = t.Id,
                        employeeId = t.EmployeeId,
                        employeeName = t.EmployeeName,
                        productId = t.ProductId,
                        productName = p.Name,
                        quantity = t.Quantity,
                        unitPrice = t.UnitPrice,
                        totalAmount = t.UnitPrice * t.Quantity,
                        supplierId = t.SupplierId,
                        type = t.TransactionType,
                        transactionType = t.TransactionType,
                        date = t.TransactionDate,
                        transactionDate = t.TransactionDate,
                        note = t.Note
                    }
                )
                .ToListAsync();

            var missingEmployeeRows = rawHistory
                .Where(x => (x.employeeId <= 0 || string.IsNullOrWhiteSpace(x.employeeName)) && !string.IsNullOrWhiteSpace(x.note))
                .ToList();

            var importReceiptIds = missingEmployeeRows
                .Where(x => string.Equals(x.transactionType, "IMPORT", StringComparison.OrdinalIgnoreCase))
                .Select(x => ExtractReceiptId(x.note))
                .Where(x => x.HasValue)
                .Select(x => x!.Value)
                .Distinct()
                .ToList();

            var exportReceiptIds = missingEmployeeRows
                .Where(x => string.Equals(x.transactionType, "EXPORT", StringComparison.OrdinalIgnoreCase))
                .Select(x => ExtractReceiptId(x.note))
                .Where(x => x.HasValue)
                .Select(x => x!.Value)
                .Distinct()
                .ToList();

            var importEmployeeMap = importReceiptIds.Count == 0
                ? new Dictionary<int, (int EmployeeId, string EmployeeName)>()
                : await _context.ImportReceipts
                    .AsNoTracking()
                    .Where(r => importReceiptIds.Contains(r.Id))
                    .ToDictionaryAsync(r => r.Id, r => (r.EmployeeId, r.EmployeeName));

            var exportEmployeeMap = exportReceiptIds.Count == 0
                ? new Dictionary<int, (int EmployeeId, string EmployeeName)>()
                : await _context.ExportReceipts
                    .AsNoTracking()
                    .Where(r => exportReceiptIds.Contains(r.Id))
                    .ToDictionaryAsync(r => r.Id, r => (r.EmployeeId, r.EmployeeName));

            var history = rawHistory.Select(x =>
            {
                var employeeId = x.employeeId;
                var employeeName = x.employeeName;

                if (employeeId > 0 && !string.IsNullOrWhiteSpace(employeeName))
                {
                    return new
                    {
                        x.id,
                        employeeId,
                        employeeName,
                        x.productId,
                        x.productName,
                        x.quantity,
                        x.unitPrice,
                        x.totalAmount,
                        x.supplierId,
                        x.type,
                        x.transactionType,
                        x.date,
                        x.transactionDate,
                        x.note
                    };
                }

                var receiptId = ExtractReceiptId(x.note);
                if (receiptId.HasValue)
                {
                    if (string.Equals(x.transactionType, "IMPORT", StringComparison.OrdinalIgnoreCase)
                        && importEmployeeMap.TryGetValue(receiptId.Value, out var importEmployee))
                    {
                        employeeId = importEmployee.EmployeeId;
                        employeeName = importEmployee.EmployeeName;
                    }
                    else if (string.Equals(x.transactionType, "EXPORT", StringComparison.OrdinalIgnoreCase)
                        && exportEmployeeMap.TryGetValue(receiptId.Value, out var exportEmployee))
                    {
                        employeeId = exportEmployee.EmployeeId;
                        employeeName = exportEmployee.EmployeeName;
                    }
                }

                return new
                {
                    x.id,
                    employeeId,
                    employeeName,
                    x.productId,
                    x.productName,
                    x.quantity,
                    x.unitPrice,
                    x.totalAmount,
                    x.supplierId,
                    x.type,
                    x.transactionType,
                    x.date,
                    x.transactionDate,
                    x.note
                };
            }).ToList();

            return Ok(history);
        }

        private static int? ExtractReceiptId(string? note)
        {
            if (string.IsNullOrWhiteSpace(note)) return null;

            var match = Regex.Match(note, @"phi[ếe]u\s+(\d+)", RegexOptions.IgnoreCase);
            if (!match.Success) return null;

            return int.TryParse(match.Groups[1].Value, out var receiptId) ? receiptId : null;
        }

        // POST: api/inventory/import
        [HttpPost("import")]
        [Authorize(Roles = "Admin,ThuKho")]
        public async Task<IActionResult> ImportStock([FromBody] ImportRequestDto request)
        {
            if (request.Items == null || !request.Items.Any()) return BadRequest("Danh sách trống.");

            var employeeIdClaim = User.FindFirstValue("userId")
                ?? User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            var employeeName = User.FindFirstValue("username")
                ?? User.FindFirstValue(ClaimTypes.Name)
                ?? User.FindFirstValue(JwtRegisteredClaimNames.UniqueName);

            if (!int.TryParse(employeeIdClaim, out var employeeId) || employeeId <= 0 || string.IsNullOrWhiteSpace(employeeName))
            {
                return Unauthorized("Không xác định được thông tin nhân viên thực hiện.");
            }

            employeeName = employeeName.Trim();

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var receipt = new ImportReceipt
                {
                    EmployeeId = employeeId,
                    EmployeeName = employeeName,
                    Note = request.Note,
                    SupplierId = request.SupplierId,
                    ImportDate = DateTime.Now
                };
                _context.ImportReceipts.Add(receipt);
                await _context.SaveChangesAsync();

                foreach (var item in request.Items)
                {
                    if (item.Quantity <= 0) return BadRequest("Số lượng phải > 0.");

                    var product = await _context.Products.FindAsync(item.ProductId);
                    if (product == null) return NotFound($"Không tìm thấy SP {item.ProductId}.");

                    product.Stock += item.Quantity; // Cộng dồn tồn kho

                    _context.StockTransactions.Add(new StockTransaction
                    {
                        EmployeeId = employeeId,
                        EmployeeName = employeeName,
                        ProductId = item.ProductId,
                        TransactionType = "IMPORT",
                        Quantity = item.Quantity,
                        UnitPrice = item.Price ?? 0,
                        SupplierId = request.SupplierId,
                        TransactionDate = DateTime.Now,
                        Note = $"Nhập theo phiếu {receipt.Id}"
                    });
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new
                {
                    Message = "Nhập kho thành công!",
                    ReceiptId = receipt.Id,
                    EmployeeId = employeeId,
                    EmployeeName = employeeName
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }

        // POST: api/inventory/export
        [HttpPost("export")]
        [Authorize(Roles = "Admin,ThuKho")]
        public async Task<IActionResult> ExportStock([FromBody] ExportRequestDto request)
        {
            if (request.Items == null || !request.Items.Any()) return BadRequest("Danh sách trống.");

            var employeeIdClaim = User.FindFirstValue("userId")
                ?? User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            var employeeName = User.FindFirstValue("username")
                ?? User.FindFirstValue(ClaimTypes.Name)
                ?? User.FindFirstValue(JwtRegisteredClaimNames.UniqueName);

            if (!int.TryParse(employeeIdClaim, out var employeeId) || employeeId <= 0 || string.IsNullOrWhiteSpace(employeeName))
            {
                return Unauthorized("Không xác định được thông tin nhân viên thực hiện.");
            }

            employeeName = employeeName.Trim();

            var exportNote = string.IsNullOrWhiteSpace(request.Note)
                ? (request.Reason?.Trim() ?? string.Empty)
                : request.Note.Trim();

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var receipt = new ExportReceipt
                {
                    EmployeeId = employeeId,
                    EmployeeName = employeeName,
                    Reason = exportNote,
                    ExportDate = DateTime.Now
                };
                _context.ExportReceipts.Add(receipt);
                await _context.SaveChangesAsync();

                foreach (var item in request.Items)
                {
                    if (item.Quantity <= 0) return BadRequest("Số lượng xuất phải > 0.");

                    var product = await _context.Products.FindAsync(item.ProductId);
                    if (product == null) return NotFound($"Không tìm thấy SP {item.ProductId}.");

                    // Bắt lỗi nếu xuất vượt quá số lượng tồn
                    if (product.Stock < item.Quantity)
                    {
                        return BadRequest($"Không đủ hàng: '{product.Name}'. Tồn: {product.Stock}, Yêu cầu: {item.Quantity}.");
                    }

                    product.Stock -= item.Quantity; // Trừ tồn kho

                    _context.StockTransactions.Add(new StockTransaction
                    {
                        EmployeeId = employeeId,
                        EmployeeName = employeeName,
                        ProductId = item.ProductId,
                        TransactionType = "EXPORT",
                        Quantity = item.Quantity,
                        UnitPrice = item.Price ?? 0,
                        SupplierId = null,
                        TransactionDate = DateTime.Now,
                        Note = string.IsNullOrWhiteSpace(exportNote)
                            ? $"Xuất theo phiếu {receipt.Id}"
                            : $"Xuất theo phiếu {receipt.Id} - {exportNote}"
                    });
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new
                {
                    Message = "Xuất kho thành công!",
                    ReceiptId = receipt.Id,
                    EmployeeId = employeeId,
                    EmployeeName = employeeName
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }
    }
}