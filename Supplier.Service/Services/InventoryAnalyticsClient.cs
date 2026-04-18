using System.Net.Http.Headers;
using System.Net.Http.Json;
using Supplier.Service.DTOs;

namespace Supplier.Service.Services;

public sealed class InventoryAnalyticsClient
{
    private readonly HttpClient _httpClient;

    public InventoryAnalyticsClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<InventoryHistoryDto>> GetHistoryAsync(int limit, string? bearerToken, CancellationToken cancellationToken)
    {
        var safeLimit = Math.Clamp(limit, 1, 5000);
        using var request = new HttpRequestMessage(HttpMethod.Get, $"api/inventory/history?limit={safeLimit}");
        ApplyAuthorizationHeader(request, bearerToken);

        using var response = await _httpClient.SendAsync(request, cancellationToken);
        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<List<InventoryHistoryDto>>(cancellationToken: cancellationToken);
        return payload ?? new List<InventoryHistoryDto>();
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
