using System.ComponentModel.DataAnnotations;

namespace Auth.Service.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Username là bắt buộc")]
        [MaxLength(50, ErrorMessage = "Username không được vượt quá 50 ký tự")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "PasswordHash là bắt buộc")]
        [MaxLength(255, ErrorMessage = "PasswordHash không được vượt quá 255 ký tự")]
        public string PasswordHash { get; set; } = string.Empty;

        [Required(ErrorMessage = "Role là bắt buộc")]
        [RegularExpression("^(Admin|ThuKho|KeToan)$", ErrorMessage = "Role chỉ được là Admin, ThuKho hoặc KeToan")]
        public string Role { get; set; } = "ThuKho";

        public bool IsActive { get; set; } = true;
    }
}
