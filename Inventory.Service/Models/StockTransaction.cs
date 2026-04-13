using System.ComponentModel.DataAnnotations;

namespace Inventory.Service.Models
{
    public class StockTransaction
    {
        public int Id { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "ProductId không hợp lệ")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Loại giao dịch không được để trống")]
        [MaxLength(20, ErrorMessage = "Loại giao dịch không được vượt quá 20 ký tự")]
        public string TransactionType { get; set; } = ""; // "IMPORT" hoặc "EXPORT"

        [Range(1, 100000, ErrorMessage = "Số lượng giao dịch phải lớn hơn 0")]
        public int Quantity { get; set; }

        public DateTime TransactionDate { get; set; }

        [MaxLength(500, ErrorMessage = "Ghi chú không được vượt quá 500 ký tự")]
        public string Note { get; set; } = "";
    }
}