using System.ComponentModel.DataAnnotations;

namespace Inventory.Service.DTOs
{
    public class ExportRequestDto
    {
        [MaxLength(500, ErrorMessage = "Ghi chú xuất kho không được vượt quá 500 ký tự")]
        public string? Note { get; set; }

        [MaxLength(500, ErrorMessage = "Lý do xuất kho không được vượt quá 500 ký tự")]
        public string? Reason { get; set; }

        [Required(ErrorMessage = "Danh sách sản phẩm xuất kho không được để trống")]
        [MinLength(1, ErrorMessage = "Phải có ít nhất 1 sản phẩm trong phiếu xuất kho")]
        public List<StockItemDto> Items { get; set; } = new List<StockItemDto>();
    }
}