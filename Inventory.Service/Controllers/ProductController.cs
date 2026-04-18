using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Inventory.Service.Data;
using Inventory.Service.Models;
using System.ComponentModel.DataAnnotations;

[Route("api/inventory/[controller]")]
[ApiController]
[Authorize]
public class ProductController : ControllerBase
{
    private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".jpg", ".jpeg", ".png", ".webp"
    };

    private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "image/jpeg", "image/png", "image/webp"
    };

    private const long MaxFileSizeInBytes = 5 * 1024 * 1024; // 5MB

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
        [FromQuery, Range(1, int.MaxValue, ErrorMessage = "pageNumber phải lớn hơn hoặc bằng 1")] int pageNumber = 1,
        [FromQuery, Range(1, 100, ErrorMessage = "pageSize phải nằm trong khoảng 1-100")] int pageSize = 10)
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
    [Authorize(Roles = "Admin,ThuKho")]
    public async Task<ActionResult<Product>> PostProduct([FromBody] ProductUpsertRequest request)
    {
        var product = new Product
        {
            Name = request.Name.Trim(),
            Category = request.Category.Trim(),
            Unit = request.Unit.Trim(),
            Stock = request.Stock,
            MinStock = request.MinStock,
            ImageUrl = request.ImageUrl
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        // Trả về mã 201 Created và kèm theo URL để lấy sản phẩm vừa tạo
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    // PUT: api/inventory/product/5
    // Cập nhật thông tin sản phẩm
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,ThuKho")]
    public async Task<IActionResult> PutProduct(int id, [FromBody] ProductUpsertRequest request)
    {
        if (id != request.Id)
        {
            return BadRequest(); // Trả về 400 nếu Id trên URL và trong body không khớp
        }

        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }

        product.Name = request.Name.Trim();
        product.Category = request.Category.Trim();
        product.Unit = request.Unit.Trim();
        product.Stock = request.Stock;
        product.MinStock = request.MinStock;
        product.ImageUrl = request.ImageUrl;

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
    [Authorize(Roles = "Admin,ThuKho")]
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
    [Authorize(Roles = "Admin,ThuKho")]
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

            if (file.Length > MaxFileSizeInBytes)
            {
                return BadRequest("Kích thước file vượt quá giới hạn 5MB.");
            }

            var extension = Path.GetExtension(file.FileName);
            if (string.IsNullOrWhiteSpace(extension) || !AllowedExtensions.Contains(extension))
            {
                return BadRequest("Định dạng ảnh không hợp lệ. Chỉ chấp nhận .jpg, .jpeg, .png, .webp.");
            }

            if (string.IsNullOrWhiteSpace(file.ContentType) || !AllowedContentTypes.Contains(file.ContentType))
            {
                return BadRequest("Content-Type không hợp lệ cho file ảnh.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = $"{Guid.NewGuid():N}{extension.ToLowerInvariant()}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            await using (var fileStream = new FileStream(filePath, FileMode.Create))
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
        [Required(ErrorMessage = "File ảnh là bắt buộc")]
        public IFormFile? File { get; set; }
    }

    public class ProductUpsertRequest
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên sản phẩm không được để trống")]
        [MaxLength(255, ErrorMessage = "Tên sản phẩm không được vượt quá 255 ký tự")]
        public string Name { get; set; } = "";

        [Required(ErrorMessage = "Danh mục không được để trống")]
        [MaxLength(100)]
        public string Category { get; set; } = "";

        [Required(ErrorMessage = "Đơn vị tính không được để trống")]
        [MaxLength(50)]
        public string Unit { get; set; } = "";

        [Range(0, int.MaxValue, ErrorMessage = "Số lượng tồn kho không được là số âm")]
        public int Stock { get; set; } = 0;

        [Range(0, 10000, ErrorMessage = "Mức tồn kho tối thiểu không hợp lệ")]
        public int MinStock { get; set; } = 10;

        [MaxLength(500, ErrorMessage = "Đường dẫn ảnh không được vượt quá 500 ký tự")]
        public string? ImageUrl { get; set; }

        [Range(typeof(decimal), "0", "79228162514264337593543950335", ErrorMessage = "Giá sản phẩm không được âm")]
        public decimal? Price { get; set; }
    }

}