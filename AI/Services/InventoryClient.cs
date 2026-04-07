using System.Net.Http.Json;

public class InventoryClient
{
    private readonly HttpClient _httpClient;

    public InventoryClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GetInventorySummary()
    {
        // API của bạn tự định nghĩa
        var response = await _httpClient.GetAsync("/api/inventory/stock");

        if (!response.IsSuccessStatusCode)
            return "Không lấy được dữ liệu";

        var content = await response.Content.ReadAsStringAsync();
        return content;
    }
}