using System.ComponentModel.DataAnnotations;

namespace Inventory.Service.Models
{
    public class ExportReceipt
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Lý do xuất kho không được để trống")]
        [MaxLength(500, ErrorMessage = "Lý do xuất kho không được vượt quá 500 ký tự")]
        public string Reason { get; set; } = "";

        public DateTime ExportDate { get; set; }
    }
}