using Microsoft.AspNetCore.Mvc;
using Auth.Service.Data;
using Auth.Service.Models;
using Auth.Service.DTOs;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var normalizedUsername = request.Username.Trim();
            if (await _context.Users.AnyAsync(x => x.Username == normalizedUsername))
            {
                return BadRequest("Username đã tồn tại");
            }

            var role = string.IsNullOrWhiteSpace(request.Role) ? "ThuKho" : request.Role;

            var user = new User
            {
                Username = normalizedUsername,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Đăng ký thành công",
                user = new { user.Id, user.Username, user.Role }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var username = request.Username.Trim();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                var failed = (HttpContext.Session.GetInt32("FailedLoginCount") ?? 0) + 1;
                HttpContext.Session.SetInt32("FailedLoginCount", failed);

                return Unauthorized(new
                {
                    message = "Sai username hoặc password",
                    failedLoginCountInSession = failed
                });
            }

            HttpContext.Session.SetInt32("FailedLoginCount", 0);
            var token = GenerateJwtToken(user);

            Response.Cookies.Append("access_token", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = Request.IsHttps,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddMinutes(60)
            });

            return Ok(new LoginResponse
            {
                Token = token,
                Username = user.Username,
                Role = user.Role,
                FailedLoginCountInSession = 0
            });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrWhiteSpace(jwtKey) || jwtKey.Length < 32)
            {
                throw new InvalidOperationException("Jwt:Key phải có tối thiểu 32 ký tự.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
                new Claim("userId", user.Id.ToString()),
                new Claim("username", user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}