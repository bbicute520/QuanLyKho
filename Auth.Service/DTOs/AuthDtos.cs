using System.ComponentModel.DataAnnotations;

namespace Auth.Service.DTOs
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Username là bắt buộc")]
        [MinLength(3, ErrorMessage = "Username tối thiểu 3 ký tự")]
        [MaxLength(50, ErrorMessage = "Username tối đa 50 ký tự")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password là bắt buộc")]
        [MinLength(6, ErrorMessage = "Password tối thiểu 6 ký tự")]
        [MaxLength(100, ErrorMessage = "Password tối đa 100 ký tự")]
        public string Password { get; set; } = string.Empty;

        [RegularExpression("^(Admin|ThuKho|KeToan)$", ErrorMessage = "Role chỉ được là Admin, ThuKho hoặc KeToan")]
        public string? Role { get; set; }
    }

    public class LoginRequest
    {
        [Required(ErrorMessage = "Username là bắt buộc")]
        [MinLength(3, ErrorMessage = "Username tối thiểu 3 ký tự")]
        [MaxLength(50, ErrorMessage = "Username tối đa 50 ký tự")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password là bắt buộc")]
        [MinLength(6, ErrorMessage = "Password tối thiểu 6 ký tự")]
        [MaxLength(100, ErrorMessage = "Password tối đa 100 ký tự")]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public int FailedLoginCountInSession { get; set; }
    }
}
