using System.Net.Http.Json;
using System.Net.Http.Headers;

public class InventoryClient
{
    private readonly HttpClient _httpClient;

    public InventoryClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GetInventorySummary(string? bearerToken = null)
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, "/api/inventory/stock");
        ApplyAuthorizationHeader(request, bearerToken);
        var response = await _httpClient.SendAsync(request);

        if (!response.IsSuccessStatusCode)
            return "Không lấy được dữ liệu";

        var content = await response.Content.ReadAsStringAsync();
        return content;
    }

    private static void ApplyAuthorizationHeader(HttpRequestMessage request, string? bearerToken)
    {
        if (string.IsNullOrWhiteSpace(bearerToken))
        {
            return;
        }

        var raw = bearerToken.Trim();
        if (raw.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        {
            raw = raw[7..].Trim();
        }

        if (!string.IsNullOrWhiteSpace(raw))
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", raw);
        }
    }
}