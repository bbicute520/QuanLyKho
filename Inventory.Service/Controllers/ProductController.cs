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

    // Bạn sẽ viết tiếp các method [HttpPost], [HttpPut], [HttpDelete] ở đây
}