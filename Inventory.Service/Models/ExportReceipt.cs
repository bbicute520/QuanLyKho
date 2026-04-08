namespace Inventory.Service.Models
{
    public class ExportReceipt
    {
        public int Id { get; set; }
        public string Reason { get; set; } = "";
        public DateTime ExportDate { get; set; }
    }
}