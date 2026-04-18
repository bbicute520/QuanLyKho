using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly AIService _aiService;
    private readonly InventoryClient _inventoryClient;

    public ChatController(AIService aiService, InventoryClient inventoryClient)
    {
        _aiService = aiService;
        _inventoryClient = inventoryClient;
    }

    [HttpPost]
    public async Task<IActionResult> Chat([FromBody] ChatRequest request)
    {
        return await Ask(request);
    }

    [HttpPost("ask")]
    public async Task<IActionResult> Ask([FromBody] ChatRequest request)
    {
        var bearerToken = ResolveBearerToken();

        // 1. lấy dữ liệu thật từ Inventory
        var data = await _inventoryClient.GetInventorySummary(bearerToken);

        // 2. hỏi AI
        var answer = await _aiService.Ask(data, request.Message);

        return Ok(new ChatResponse
        {
            Answer = answer
        });
    }

    [HttpPost("summary")]
    public async Task<IActionResult> Summary()
    {
        var bearerToken = ResolveBearerToken();
        var data = await _inventoryClient.GetInventorySummary(bearerToken);
        var answer = await _aiService.Summarize(data);

        return Ok(new ChatResponse
        {
            Answer = answer
        });
    }

    private string? ResolveBearerToken()
    {
        var authHeader = Request.Headers.Authorization.ToString();
        if (!string.IsNullOrWhiteSpace(authHeader))
        {
            return authHeader;
        }

        if (Request.Cookies.TryGetValue("access_token", out var cookieToken) && !string.IsNullOrWhiteSpace(cookieToken))
        {
            return $"Bearer {cookieToken}";
        }

        return null;
    }
}