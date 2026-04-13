using System.ComponentModel.DataAnnotations;

namespace Inventory.Service.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên sản phẩm không được để trống")]
        [MaxLength(255, ErrorMessage = "Tên sản phẩm không được vượt quá 255 ký tự")]
        public string Name { get; set; } = "";

        [Required(ErrorMessage = "Danh mục không được để trống")]
        [MaxLength(100)]
        public string Category { get; set; } = "";

        [Required(ErrorMessage = "Đơn vị tính không được để trống")]
        [MaxLength(50)]
        public string Unit { get; set; } = "";

        [Range(0, int.MaxValue, ErrorMessage = "Số lượng tồn kho không được là số âm")]
        public int Stock { get; set; } = 0;

        [Range(0, 10000, ErrorMessage = "Mức tồn kho tối thiểu không hợp lệ")]
        public int MinStock { get; set; } = 10;

        [MaxLength(500, ErrorMessage = "Đường dẫn ảnh không được vượt quá 500 ký tự")]
        public string? ImageUrl { get; set; }
    }
}