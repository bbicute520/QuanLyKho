public class ImportReceipt
{
    public int Id { get; set; }
    public DateTime ImportDate { get; set; } = DateTime.Now;
    public string Note { get; set; } = string.Empty;

    // Trường để liên kết nhà cung cấp
    public int SupplierId { get; set; }
}