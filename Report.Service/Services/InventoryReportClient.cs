using System.Net.Http.Json;
using Report.Service.DTOs;

namespace Report.Service.Services;

public sealed class InventoryReportClient
{
    private readonly HttpClient _httpClient;

    public InventoryReportClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<InventoryStockDto>> GetStockAsync(CancellationToken cancellationToken = default)
    {
        var response = await _httpClient.GetFromJsonAsync<List<InventoryStockDto>>("api/inventory/stock", cancellationToken);
        return response ?? new List<InventoryStockDto>();
    }

    public async Task<List<StockTransactionDto>> GetHistoryAsync(int limit = 500, CancellationToken cancellationToken = default)
    {
        var safeLimit = Math.Clamp(limit, 1, 500);
        var response = await _httpClient.GetFromJsonAsync<List<StockTransactionDto>>($"api/inventory/history?limit={safeLimit}", cancellationToken);
        return response ?? new List<StockTransactionDto>();
    }
}
