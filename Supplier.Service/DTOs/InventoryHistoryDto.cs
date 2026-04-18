namespace Supplier.Service.DTOs;

public sealed class InventoryHistoryDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalAmount { get; set; }
    public int? SupplierId { get; set; }
    public string Type { get; set; } = string.Empty;
    public string TransactionType { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public DateTime TransactionDate { get; set; }
    public string Note { get; set; } = string.Empty;
}
