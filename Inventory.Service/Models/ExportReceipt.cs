using System.ComponentModel.DataAnnotations;

namespace Inventory.Service.Models
{
    public class ExportReceipt
    {
        public int Id { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "EmployeeId không hợp lệ")]
        public int EmployeeId { get; set; }

        [Required(ErrorMessage = "Tên nhân viên là bắt buộc")]
        [MaxLength(100, ErrorMessage = "Tên nhân viên không được vượt quá 100 ký tự")]
        public string EmployeeName { get; set; } = "";

        [Required(ErrorMessage = "Lý do xuất kho không được để trống")]
        [MaxLength(500, ErrorMessage = "Lý do xuất kho không được vượt quá 500 ký tự")]
        public string Reason { get; set; } = "";

        public DateTime ExportDate { get; set; }
    }
}