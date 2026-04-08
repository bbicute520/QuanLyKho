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
        // 1. lấy dữ liệu thật từ Inventory
        var data = await _inventoryClient.GetInventorySummary();

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
        var data = await _inventoryClient.GetInventorySummary();
        var answer = await _aiService.Summarize(data);

        return Ok(new ChatResponse
        {
            Answer = answer
        });
    }
}