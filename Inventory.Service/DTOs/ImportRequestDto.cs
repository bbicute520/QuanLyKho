using System.ComponentModel.DataAnnotations;

namespace Inventory.Service.DTOs
{
    public class ImportRequestDto
    {
        [MaxLength(500, ErrorMessage = "Ghi chú không được vượt quá 500 ký tự")]
        public string Note { get; set; } = "";

        [Required(ErrorMessage = "SupplierId là bắt buộc")]
        [Range(1, int.MaxValue, ErrorMessage = "SupplierId không hợp lệ")]
        public int? SupplierId { get; set; }

        [Required(ErrorMessage = "Danh sách sản phẩm nhập kho không được để trống")]
        [MinLength(1, ErrorMessage = "Phải có ít nhất 1 sản phẩm trong phiếu nhập kho")]
        public List<StockItemDto> Items { get; set; } = new List<StockItemDto>();
    }

    public class StockItemDto
    {
        [Required(ErrorMessage = "Mã sản phẩm (ProductId) là bắt buộc")]
        [Range(1, int.MaxValue, ErrorMessage = "Mã sản phẩm không hợp lệ")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Số lượng (Quantity) là bắt buộc")]
        [Range(1, 100000, ErrorMessage = "Số lượng nhập kho phải lớn hơn 0 và không vượt quá 100,000")]
        public int Quantity { get; set; }

        [Range(typeof(decimal), "0", "79228162514264337593543950335", ErrorMessage = "Giá nhập kho không được âm")]
        public decimal? Price { get; set; }
    }
}