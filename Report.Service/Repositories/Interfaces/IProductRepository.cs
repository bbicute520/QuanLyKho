public interface IProductRepository
{
    Task<List<StockDto>> GetStockAsync();
    Task<List<TransactionDto>> GetTransactionsAsync(DateTime from, DateTime to);
}