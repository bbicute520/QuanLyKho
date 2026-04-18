using System.Net.Http.Json;
using System.Net.Http.Headers;
using Report.Service.DTOs;

namespace Report.Service.Services;

public sealed class InventoryReportClient
{
    private readonly HttpClient _httpClient;

    public InventoryReportClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
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

    public async Task<List<InventoryStockDto>> GetStockAsync(string? bearerToken = null, CancellationToken cancellationToken = default)
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, "api/inventory/stock");
        ApplyAuthorizationHeader(request, bearerToken);

        using var response = await _httpClient.SendAsync(request, cancellationToken);
        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<List<InventoryStockDto>>(cancellationToken: cancellationToken);
        return payload ?? new List<InventoryStockDto>();
    }

    public async Task<List<StockTransactionDto>> GetHistoryAsync(int limit = 500, string? bearerToken = null, CancellationToken cancellationToken = default)
    {
        var safeLimit = Math.Clamp(limit, 1, 5000);
        using var request = new HttpRequestMessage(HttpMethod.Get, $"api/inventory/history?limit={safeLimit}");
        ApplyAuthorizationHeader(request, bearerToken);

        using var response = await _httpClient.SendAsync(request, cancellationToken);
        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<List<StockTransactionDto>>(cancellationToken: cancellationToken);
        return payload ?? new List<StockTransactionDto>();
    }
}
