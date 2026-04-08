namespace Inventory.Service.Models
{
    public class StockTransaction
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string TransactionType { get; set; } = ""; // "IMPORT" hoặc "EXPORT"
        public int Quantity { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Note { get; set; } = "";
    }
}