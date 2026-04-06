using Microsoft.AspNetCore.Mvc;
[ApiController]
[Route("api/report")]
public class ReportController : ControllerBase
{
    private readonly IReportService _service;

    public ReportController(IReportService service)
    {
        _service = service;
    }

    [HttpGet("stock")]
    public async Task<IActionResult> GetStock()
    {
        var data = await _service.GetStockAsync();
        return Ok(data);
    }

    [HttpGet("export/excel")]
    public async Task<IActionResult> ExportExcel()
    {
        var data = await _service.GetStockAsync();
        var file = _service.ExportExcel(data);

        return File(file,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Stock.xlsx");
    }

    [HttpGet("transactions")]
    public async Task<IActionResult> GetTransactions(DateTime from, DateTime to)
    {
        if (from > to)
            return BadRequest("from must be <= to");

        var data = await _service.GetTransactionsAsync(from, to);
        return Ok(data);
    }
}