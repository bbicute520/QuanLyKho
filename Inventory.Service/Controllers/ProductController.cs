using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Inventory.Service.Data;
using Inventory.Service.Models;

[Route("api/inventory/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly WarehouseDbContext _context;

    public ProductController(WarehouseDbContext context)
    {
        _context = context;
    }

    // GET: api/inventory/product
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }

    // GET: api/inventory/product/5
    // Lấy thông tin 1 sản phẩm theo Id
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound(); // Trả về lỗi 404 nếu không tìm thấy
        }

        return product;
    }

    // POST: api/inventory/product
    // Thêm mới 1 sản phẩm
    [HttpPost]
    public async Task<ActionResult<Product>> PostProduct(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        // Trả về mã 201 Created và kèm theo URL để lấy sản phẩm vừa tạo
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    // PUT: api/inventory/product/5
    // Cập nhật thông tin sản phẩm
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduct(int id, Product product)
    {
        if (id != product.Id)
        {
            return BadRequest(); // Trả về 400 nếu Id trên URL và trong body không khớp
        }

        _context.Entry(product).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProductExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent(); // Cập nhật thành công trả về 204
    }

    // DELETE: api/inventory/product/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Hàm phụ trợ để check sản phẩm tồn tại
    private bool ProductExists(int id)
    {
        return _context.Products.Any(e => e.Id == id);
    }
}