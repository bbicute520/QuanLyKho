using Microsoft.AspNetCore.Mvc;
using Auth.Service.Data;
using Auth.Service.Models;

namespace Auth.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register(string username, string password)
        {
            // check trùng username
            if (_context.Users.Any(x => x.Username == username))
            {
                return BadRequest("Username đã tồn tại");
            }

            var user = new User
            {
                Username = username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                Role = "User"
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Đăng ký thành công");
        }
    }
}