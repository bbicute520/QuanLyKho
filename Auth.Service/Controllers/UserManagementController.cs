using Auth.Service.Data;
using Auth.Service.DTOs;
using Auth.Service.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Auth.Service.Controllers;

[ApiController]
[Route("api/auth/users")]
[Authorize(Roles = "Admin")]
public class UserManagementController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserManagementController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery] string? role, CancellationToken cancellationToken)
    {
        var query = _context.Users.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(role))
        {
            var normalizedRole = role.Trim();
            query = query.Where(x => x.Role == normalizedRole);
        }

        var users = await query
            .OrderBy(x => x.Username)
            .Select(x => new
            {
                x.Id,
                x.Username,
                x.Role,
                x.IsActive
            })
            .ToListAsync(cancellationToken);

        return Ok(users);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateManagedUserRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var normalizedUsername = request.Username.Trim();
        var normalizedRole = request.Role.Trim();

        var existed = await _context.Users.AnyAsync(x => x.Username == normalizedUsername, cancellationToken);
        if (existed)
        {
            return BadRequest("Username đã tồn tại.");
        }

        var user = new User
        {
            Username = normalizedUsername,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = normalizedRole,
            IsActive = request.IsActive
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync(cancellationToken);

        return Created($"/api/auth/users/{user.Id}", new
        {
            user.Id,
            user.Username,
            user.Role,
            user.IsActive
        });
    }

    [HttpPut("{id:int}/role")]
    public async Task<IActionResult> UpdateUserRole(int id, [FromBody] UpdateManagedUserRoleRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (user == null)
        {
            return NotFound("Không tìm thấy người dùng.");
        }

        user.Role = request.Role.Trim();
        await _context.SaveChangesAsync(cancellationToken);

        return Ok(new
        {
            user.Id,
            user.Username,
            user.Role,
            user.IsActive
        });
    }

    [HttpPatch("{id:int}/status")]
    public async Task<IActionResult> UpdateUserStatus(int id, [FromBody] UpdateManagedUserStatusRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (user == null)
        {
            return NotFound("Không tìm thấy người dùng.");
        }

        user.IsActive = request.IsActive;
        await _context.SaveChangesAsync(cancellationToken);

        return Ok(new
        {
            user.Id,
            user.Username,
            user.Role,
            user.IsActive
        });
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteUser(int id, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (user == null)
        {
            return NotFound("Không tìm thấy người dùng.");
        }

        var currentUserIdRaw = User.FindFirst("userId")?.Value;
        if (int.TryParse(currentUserIdRaw, out var currentUserId) && currentUserId == user.Id)
        {
            return BadRequest("Không thể tự xóa tài khoản Admin đang đăng nhập.");
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync(cancellationToken);

        return NoContent();
    }
}
