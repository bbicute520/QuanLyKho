using Microsoft.AspNetCore.Mvc;
using Supplier.Service.Data;

namespace Supplier.Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SupplierController(AppDbContext context)
        {
            _context = context;
        }

        // 1. GET: api/Supplier (Lấy danh sách)
        [HttpGet]
        public IActionResult GetAll()
        {
            var list = _context.Suppliers.ToList();
            return Ok(list);
        }

        // 2. POST: api/Supplier (Thêm mới)
        [HttpPost]
        public IActionResult Create(Models.Supplier supplier)
        {
            _context.Suppliers.Add(supplier);
            _context.SaveChanges();
            return Ok(supplier);
        }

        // 3. PUT: api/Supplier/{id} (Cập nhật)
        [HttpPut("{id}")]
        public IActionResult Update(int id, Models.Supplier supplier)
        {
            var existing = _context.Suppliers.Find(id);
            if (existing == null) return NotFound("Không tìm thấy nhà cung cấp");

            existing.Name = supplier.Name;
            existing.Phone = supplier.Phone;
            existing.Address = supplier.Address;
            existing.Email = supplier.Email;

            _context.SaveChanges();
            return Ok(existing);
        }
    }
}