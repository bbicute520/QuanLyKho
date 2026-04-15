namespace Report.Service.DTOs;

public sealed class InventoryStockDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int Stock { get; set; }
    public int MinStock { get; set; }
    public bool IsLowStock { get; set; }
}

public sealed class StockTransactionDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string Type { get; set; } = string.Empty;
    public string TransactionType { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public DateTime TransactionDate { get; set; }
    public string Note { get; set; } = string.Empty;
}
