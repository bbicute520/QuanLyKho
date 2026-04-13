using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Supplier.Service.Data;
using Supplier.Service.DTOs;
using Supplier.Service.Models;

namespace Supplier.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SupplierController : ControllerBase
    {
        private readonly SupplierDbContext _context;

        public SupplierController(SupplierDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search)
        {
            var query = _context.Suppliers.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var keyword = search.Trim().ToLower();
                query = query.Where(x =>
                    x.Name.ToLower().Contains(keyword) ||
                    (x.ContactPerson != null && x.ContactPerson.ToLower().Contains(keyword)) ||
                    (x.Phone != null && x.Phone.Contains(keyword)) ||
                    (x.Email != null && x.Email.ToLower().Contains(keyword)));
            }

            var suppliers = await query
                .OrderBy(x => x.Name)
                .ToListAsync();

            return Ok(suppliers);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null)
            {
                return NotFound("Không tìm thấy nhà cung cấp.");
            }

            return Ok(supplier);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,ThuKho")]
        public async Task<IActionResult> Create([FromBody] CreateSupplierRequest request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var exists = await _context.Suppliers.AnyAsync(x => x.Name == request.Name.Trim());
            if (exists)
            {
                return BadRequest("Tên nhà cung cấp đã tồn tại.");
            }

            var supplier = new SupplierInfo
            {
                Name = request.Name.Trim(),
                ContactPerson = request.ContactPerson,
                Phone = request.Phone,
                Email = request.Email,
                Address = request.Address,
                IsActive = request.IsActive,
                CreatedAt = DateTime.UtcNow
            };

            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = supplier.Id }, supplier);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin,ThuKho")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSupplierRequest request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null)
            {
                return NotFound("Không tìm thấy nhà cung cấp.");
            }

            supplier.Name = request.Name.Trim();
            supplier.ContactPerson = request.ContactPerson;
            supplier.Phone = request.Phone;
            supplier.Email = request.Email;
            supplier.Address = request.Address;
            supplier.IsActive = request.IsActive;

            await _context.SaveChangesAsync();
            return Ok(supplier);
        }
    }
}
