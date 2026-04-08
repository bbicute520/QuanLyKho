using Auth.Service.Data;
using Auth.Service.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Auth.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public IActionResult Register(string username, string password, string role)
        {
            if (_context.Users.Any(x => x.Username == username))
            {
                return BadRequest("Username đã tồn tại");
            }

            var validRoles = new[]
            {
            RoleConstants.Admin,
            RoleConstants.ThuKho,
            RoleConstants.KeToan
        };

            if (!validRoles.Contains(role))
            {
                return BadRequest("Role không hợp lệ");
            }

            var user = new User
            {
                Username = username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                Role = role
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Đăng ký thành công");
        }

        [HttpPost("login")]
        public IActionResult Login(string username, string password)
        {
            var user = _context.Users.FirstOrDefault(x => x.Username == username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return Unauthorized("Sai tài khoản hoặc mật khẩu");
            }

            var token = GenerateJwtToken(user);

            return Ok(new { token });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtKey = _configuration["Jwt:Key"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [Authorize(Roles = RoleConstants.Admin)]
        [HttpGet("admin")]
        public IActionResult AdminOnly()
        {
            return Ok("Admin");
        }

        [Authorize(Roles = $"{RoleConstants.Admin},{RoleConstants.ThuKho}")]
        [HttpGet("warehouse")]
        public IActionResult Warehouse()
        {
            return Ok("Admin + ThuKho");
        }

        [Authorize(Roles = $"{RoleConstants.Admin},{RoleConstants.KeToan}")]
        [HttpGet("report")]
        public IActionResult Report()
        {
            return Ok("Admin + KeToan");
        }
    }
}