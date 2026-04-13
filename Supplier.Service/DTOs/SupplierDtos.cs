using System.ComponentModel.DataAnnotations;

namespace Supplier.Service.DTOs
{
    public class CreateSupplierRequest
    {
        [Required(ErrorMessage = "Tên nhà cung cấp là bắt buộc")]
        [MaxLength(200, ErrorMessage = "Tên nhà cung cấp không được vượt quá 200 ký tự")]
        public string Name { get; set; } = string.Empty;

        [MaxLength(50, ErrorMessage = "Tên người liên hệ không được vượt quá 50 ký tự")]
        public string? ContactPerson { get; set; }

        [MaxLength(20, ErrorMessage = "Số điện thoại không được vượt quá 20 ký tự")]
        public string? Phone { get; set; }

        [EmailAddress(ErrorMessage = "Email không đúng định dạng")]
        [MaxLength(150, ErrorMessage = "Email không được vượt quá 150 ký tự")]
        public string? Email { get; set; }

        [MaxLength(300, ErrorMessage = "Địa chỉ không được vượt quá 300 ký tự")]
        public string? Address { get; set; }

        public bool IsActive { get; set; } = true;
    }

    public class UpdateSupplierRequest : CreateSupplierRequest
    {
    }
}
