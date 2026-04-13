using System.ComponentModel.DataAnnotations;

namespace Inventory.Service.Models
{
    public class ImportReceipt
    {
        public int Id { get; set; }

        [MaxLength(500, ErrorMessage = "Ghi chú không được vượt quá 500 ký tự")]
        public string Note { get; set; } = "";

        [Range(1, int.MaxValue, ErrorMessage = "SupplierId không hợp lệ")]
        public int? SupplierId { get; set; }

        public DateTime ImportDate { get; set; }
    }
}