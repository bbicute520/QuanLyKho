using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Inventory.Service.Data;
using Inventory.Service.DTOs;
using Inventory.Service.Models;

namespace Inventory.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

        // POST: api/inventory/import
        [HttpPost("import")]
        public async Task<IActionResult> ImportStock([FromBody] ImportRequestDto request)
        {
            if (request.Items == null || !request.Items.Any()) return BadRequest("Danh sách trống.");

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var receipt = new ImportReceipt
                {
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
                        ProductId = item.ProductId,
                        TransactionType = "IMPORT",
                        Quantity = item.Quantity,
                        TransactionDate = DateTime.Now,
                        Note = $"Nhập theo phiếu {receipt.Id}"
                    });
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { Message = "Nhập kho thành công!", ReceiptId = receipt.Id });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }

        // POST: api/inventory/export
        [HttpPost("export")]
        public async Task<IActionResult> ExportStock([FromBody] ExportRequestDto request)
        {
            if (request.Items == null || !request.Items.Any()) return BadRequest("Danh sách trống.");

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var receipt = new ExportReceipt
                {
                    Reason = request.Reason,
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
                        ProductId = item.ProductId,
                        TransactionType = "EXPORT",
                        Quantity = item.Quantity,
                        TransactionDate = DateTime.Now,
                        Note = $"Xuất theo phiếu {receipt.Id}"
                    });
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { Message = "Xuất kho thành công!", ReceiptId = receipt.Id });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }
    }
}