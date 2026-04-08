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

    /// GET: api/inventory/product
    [HttpGet]
    public async Task<ActionResult<PagedResult<Product>>> GetProducts(
        [FromQuery] string? searchName,
        [FromQuery] string? category,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        // Bắt đầu khởi tạo Query (AsNoTracking giúp tăng tốc độ do chỉ đọc dữ liệu)
        var query = _context.Products.AsNoTracking().AsQueryable();

        // 1. Xử lý Filter: Lọc theo danh mục
        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(p => p.Category.ToLower() == category.ToLower());
        }

        // 2. Xử lý Filter: Tìm kiếm theo tên (sử dụng Contains tương đương với LIKE '%text%' trong SQL)
        if (!string.IsNullOrEmpty(searchName))
        {
            query = query.Where(p => p.Name.ToLower().Contains(searchName.ToLower()));
        }

        // 3. Đếm tổng số bản ghi thỏa mãn điều kiện (Rất quan trọng để Frontend vẽ giao diện chuyển trang)
        var totalRecords = await query.CountAsync();

        // 4. Xử lý Phân trang: Bỏ qua các bản ghi của trang trước (Skip) và lấy số bản ghi của trang hiện tại (Take)
        var products = await query
            .OrderBy(p => p.Id)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        // 5. Trả về kết quả bọc trong một object chứa cả Metadata phân trang
        return Ok(new PagedResult<Product>
        {
            TotalRecords = totalRecords,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling(totalRecords / (double)pageSize),
            Data = products
        });
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

    // POST: api/inventory/product/upload
    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadImage([FromForm] UploadImageRequest request)
    {
        try
        {
            var file = request.File;

            if (file == null || file.Length == 0)
            {
                return BadRequest("Không có file nào được chọn hoặc file rỗng.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            var imageUrl = $"/images/{uniqueFileName}";

            return Ok(new { Url = imageUrl, Message = "Upload ảnh thành công!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Lỗi Server: {ex.Message}\nChi tiết: {ex.StackTrace}");
        }
    }
    public class PagedResult<T>
    {
        public int TotalRecords { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public List<T>? Data { get; set; }
    }

    public class UploadImageRequest
    {
        public IFormFile? File { get; set; }
    }

}