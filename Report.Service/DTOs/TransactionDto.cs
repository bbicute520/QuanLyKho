public class TransactionDto
{
    public DateTime Date { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public string Type { get; set; } // Import / Export
}