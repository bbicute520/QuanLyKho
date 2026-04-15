using System.Globalization;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using Report.Service.DTOs;
using Report.Service.Services;

namespace Report.Service.Controllers;

[ApiController]
[Route("api/report")]
public sealed class ReportController : ControllerBase
{
    private readonly InventoryReportClient _inventoryReportClient;

    public ReportController(InventoryReportClient inventoryReportClient)
    {
        _inventoryReportClient = inventoryReportClient;
    }

    [HttpGet("stock")]
    public async Task<IActionResult> GetStockReport(CancellationToken cancellationToken)
    {
        var stock = await _inventoryReportClient.GetStockAsync(cancellationToken);

        var payload = new
        {
            generatedAt = DateTime.UtcNow,
            totalProducts = stock.Count,
            totalStock = stock.Sum(item => item.Stock),
            lowStockCount = stock.Count(item => item.IsLowStock),
            data = stock
        };

        return Ok(payload);
    }

    [HttpGet("transactions")]
    public async Task<IActionResult> GetTransactions(
        [FromQuery] DateTime? from,
        [FromQuery] DateTime? to,
        [FromQuery] string? type,
        [FromQuery] int limit = 200,
        CancellationToken cancellationToken = default)
    {
        var history = await _inventoryReportClient.GetHistoryAsync(limit, cancellationToken);
        var filtered = FilterTransactions(history, from, to, type)
            .OrderByDescending(item => ResolveTransactionDate(item))
            .ToList();

        return Ok(filtered);
    }

    [HttpGet("export/excel")]
    public async Task<IActionResult> ExportReport(
        [FromQuery] DateTime? from,
        [FromQuery] DateTime? to,
        [FromQuery] string? reportType,
        [FromQuery] string? format,
        CancellationToken cancellationToken)
    {
        var normalizedFormat = string.IsNullOrWhiteSpace(format) ? "xlsx" : format.Trim().ToLowerInvariant();
        if (normalizedFormat is not ("xlsx" or "csv"))
        {
            return BadRequest("Định dạng không hợp lệ. Chỉ hỗ trợ xlsx hoặc csv.");
        }

        var normalizedType = string.IsNullOrWhiteSpace(reportType) ? "inventory" : reportType.Trim().ToLowerInvariant();
        var fileSafeType = normalizedType.Replace(" ", "-");
        var fileName = $"report-{fileSafeType}-{DateTime.UtcNow:yyyyMMddHHmmss}.{normalizedFormat}";

        if (normalizedType == "inventory")
        {
            var stockRows = await _inventoryReportClient.GetStockAsync(cancellationToken);
            if (normalizedFormat == "csv")
            {
                var csv = BuildInventoryCsv(stockRows);
                return File(Encoding.UTF8.GetBytes(csv), "text/csv", fileName);
            }

            var xlsxBytes = BuildInventoryExcel(stockRows);
            return File(xlsxBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }

        var typeFilter = normalizedType switch
        {
            "inward" => "IMPORT",
            "outward" => "EXPORT",
            _ => string.Empty
        };

        var history = await _inventoryReportClient.GetHistoryAsync(500, cancellationToken);
        var transactionRows = FilterTransactions(history, from, to, typeFilter)
            .OrderByDescending(item => ResolveTransactionDate(item))
            .ToList();

        if (normalizedFormat == "csv")
        {
            var csv = BuildTransactionCsv(transactionRows);
            return File(Encoding.UTF8.GetBytes(csv), "text/csv", fileName);
        }

        var excelBytes = BuildTransactionExcel(transactionRows);
        return File(excelBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
    }

    private static IEnumerable<StockTransactionDto> FilterTransactions(
        IEnumerable<StockTransactionDto> source,
        DateTime? from,
        DateTime? to,
        string? type)
    {
        var query = source;

        if (from.HasValue)
        {
            var fromDate = from.Value.Date;
            query = query.Where(item => ResolveTransactionDate(item) >= fromDate);
        }

        if (to.HasValue)
        {
            var toDate = to.Value.Date.AddDays(1).AddTicks(-1);
            query = query.Where(item => ResolveTransactionDate(item) <= toDate);
        }

        if (!string.IsNullOrWhiteSpace(type))
        {
            var normalizedType = type.Trim().ToUpperInvariant();
            query = query.Where(item => ResolveTransactionType(item).Contains(normalizedType, StringComparison.OrdinalIgnoreCase));
        }

        return query;
    }

    private static string ResolveTransactionType(StockTransactionDto item)
    {
        if (!string.IsNullOrWhiteSpace(item.Type))
        {
            return item.Type;
        }

        return item.TransactionType;
    }

    private static DateTime ResolveTransactionDate(StockTransactionDto item)
    {
        if (item.Date != default)
        {
            return item.Date;
        }

        return item.TransactionDate;
    }

    private static string BuildInventoryCsv(IEnumerable<InventoryStockDto> rows)
    {
        var sb = new StringBuilder();
        sb.AppendLine("ProductId,ProductName,Category,Stock,MinStock,IsLowStock");

        foreach (var row in rows)
        {
            sb.AppendLine(string.Join(',',
                EscapeCsv(row.Id.ToString(CultureInfo.InvariantCulture)),
                EscapeCsv(row.Name),
                EscapeCsv(row.Category),
                EscapeCsv(row.Stock.ToString(CultureInfo.InvariantCulture)),
                EscapeCsv(row.MinStock.ToString(CultureInfo.InvariantCulture)),
                EscapeCsv(row.IsLowStock ? "Yes" : "No")));
        }

        return sb.ToString();
    }

    private static string BuildTransactionCsv(IEnumerable<StockTransactionDto> rows)
    {
        var sb = new StringBuilder();
        sb.AppendLine("TransactionId,ProductId,ProductName,Type,Quantity,Date,Note");

        foreach (var row in rows)
        {
            sb.AppendLine(string.Join(',',
                EscapeCsv(row.Id.ToString(CultureInfo.InvariantCulture)),
                EscapeCsv(row.ProductId.ToString(CultureInfo.InvariantCulture)),
                EscapeCsv(row.ProductName),
                EscapeCsv(ResolveTransactionType(row)),
                EscapeCsv(row.Quantity.ToString(CultureInfo.InvariantCulture)),
                EscapeCsv(ResolveTransactionDate(row).ToString("yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture)),
                EscapeCsv(row.Note)));
        }

        return sb.ToString();
    }

    private static byte[] BuildInventoryExcel(IReadOnlyList<InventoryStockDto> rows)
    {
        using var package = new ExcelPackage();
        var sheet = package.Workbook.Worksheets.Add("Inventory");

        sheet.Cells[1, 1].Value = "Product Id";
        sheet.Cells[1, 2].Value = "Product Name";
        sheet.Cells[1, 3].Value = "Category";
        sheet.Cells[1, 4].Value = "Stock";
        sheet.Cells[1, 5].Value = "Min Stock";
        sheet.Cells[1, 6].Value = "Low Stock";

        for (var i = 0; i < rows.Count; i++)
        {
            var row = rows[i];
            var excelRow = i + 2;
            sheet.Cells[excelRow, 1].Value = row.Id;
            sheet.Cells[excelRow, 2].Value = row.Name;
            sheet.Cells[excelRow, 3].Value = row.Category;
            sheet.Cells[excelRow, 4].Value = row.Stock;
            sheet.Cells[excelRow, 5].Value = row.MinStock;
            sheet.Cells[excelRow, 6].Value = row.IsLowStock ? "Yes" : "No";
        }

        sheet.Cells[sheet.Dimension.Address].AutoFitColumns();
        return package.GetAsByteArray();
    }

    private static byte[] BuildTransactionExcel(IReadOnlyList<StockTransactionDto> rows)
    {
        using var package = new ExcelPackage();
        var sheet = package.Workbook.Worksheets.Add("Transactions");

        sheet.Cells[1, 1].Value = "Transaction Id";
        sheet.Cells[1, 2].Value = "Product Id";
        sheet.Cells[1, 3].Value = "Product Name";
        sheet.Cells[1, 4].Value = "Type";
        sheet.Cells[1, 5].Value = "Quantity";
        sheet.Cells[1, 6].Value = "Date";
        sheet.Cells[1, 7].Value = "Note";

        for (var i = 0; i < rows.Count; i++)
        {
            var row = rows[i];
            var excelRow = i + 2;
            sheet.Cells[excelRow, 1].Value = row.Id;
            sheet.Cells[excelRow, 2].Value = row.ProductId;
            sheet.Cells[excelRow, 3].Value = row.ProductName;
            sheet.Cells[excelRow, 4].Value = ResolveTransactionType(row);
            sheet.Cells[excelRow, 5].Value = row.Quantity;
            sheet.Cells[excelRow, 6].Value = ResolveTransactionDate(row).ToString("yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
            sheet.Cells[excelRow, 7].Value = row.Note;
        }

        sheet.Cells[sheet.Dimension.Address].AutoFitColumns();
        return package.GetAsByteArray();
    }

    private static string EscapeCsv(string input)
    {
        if (!input.Contains(',') && !input.Contains('"') && !input.Contains('\n') && !input.Contains('\r'))
        {
            return input;
        }

        return $"\"{input.Replace("\"", "\"\"")}\"";
    }
}
