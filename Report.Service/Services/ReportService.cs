using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;

public class ReportService : IReportService
{
    private readonly IProductRepository _repository;

    public ReportService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<StockDto>> GetStockAsync()
    {
        return await _repository.GetStockAsync();
    }

    public async Task<List<TransactionDto>> GetTransactionsAsync(DateTime from, DateTime to)
    {
        return await _repository.GetTransactionsAsync(from, to);
    }

    public byte[] ExportExcel(List<StockDto> data)
    {
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

        using var package = new ExcelPackage();
        var ws = package.Workbook.Worksheets.Add("Stock");

        // Header
        ws.Cells[1, 1].Value = "Product Name";
        ws.Cells[1, 2].Value = "Quantity";
        using (var range = ws.Cells[1, 1, 1, 2])
        {
            range.Style.Font.Bold = true;
            range.Style.Fill.PatternType = ExcelFillStyle.Solid;
            range.Style.Fill.BackgroundColor.SetColor(Color.LightCoral);

            // Border
            range.Style.Border.Top.Style = ExcelBorderStyle.Thin;
            range.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            range.Style.Border.Left.Style = ExcelBorderStyle.Thin;
            range.Style.Border.Right.Style = ExcelBorderStyle.Thin;
        }
        // Data
        for (int i = 0; i < data.Count; i++)
        {
            ws.Cells[i + 2, 1].Value = data[i].ProductName;
            ws.Cells[i + 2, 2].Value = data[i].Quantity;
        }

        ws.Cells.AutoFitColumns();

        return package.GetAsByteArray();
    }
}