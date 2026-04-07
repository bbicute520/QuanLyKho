public interface IReportService
{
    Task<List<StockDto>> GetStockAsync();
    byte[] ExportExcel(List<StockDto> data);

    Task<List<TransactionDto>> GetTransactionsAsync(DateTime from, DateTime to);
}