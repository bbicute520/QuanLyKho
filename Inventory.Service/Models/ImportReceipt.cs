namespace Inventory.Service.Models
{
    public class ImportReceipt
    {
        public int Id { get; set; }
        public string Note { get; set; } = "";
        public int? SupplierId { get; set; }
        public DateTime ImportDate { get; set; }
    }
}