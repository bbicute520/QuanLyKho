public class ProductRepository : IProductRepository
{
    public async Task<List<StockDto>> GetStockAsync()
    {
        // Fake data để test trước
        return await Task.FromResult(new List<StockDto>
        {
            new StockDto { ProductName = "Apple", Quantity = 10 },
            new StockDto { ProductName = "Banana", Quantity = 20 }
        });
    }

    public async Task<List<TransactionDto>> GetTransactionsAsync(DateTime from, DateTime to)
    {
        var data = new List<TransactionDto>
    {
        new TransactionDto { Date = DateTime.Now.AddDays(-1), ProductName = "Apple", Quantity = 10, Type = "Import" },
        new TransactionDto { Date = DateTime.Now.AddDays(-2), ProductName = "Banana", Quantity = 5, Type = "Export" },
        new TransactionDto { Date = DateTime.Now.AddDays(-10), ProductName = "Orange", Quantity = 20, Type = "Import" }
    };

        return data
            .Where(x => x.Date >= from && x.Date <= to)
            .ToList();
    }
}