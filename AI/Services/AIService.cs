using System.Text;
using System.Text.Json;

public class AIService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public AIService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<string> Ask(string data, string question)
    {
        var prompt = BuildAskPrompt(data, question);
        return await SendPrompt(prompt);
    }

    public async Task<string> Summarize(string data)
    {
        var prompt = BuildSummaryPrompt(data);
        return await SendPrompt(prompt);
    }

    private string BuildAskPrompt(string data, string question)
    {
        return $@"
Bạn là trợ lý quản lý kho.

Chỉ trả lời dựa trên dữ liệu sau:
{data}

Nếu không có thông tin, hãy nói 'Không có dữ liệu'.

Câu hỏi: {question}
";
    }

    private string BuildSummaryPrompt(string data)
    {
        return $@"
Bạn là trợ lý quản lý kho.

Hãy tóm tắt dữ liệu kho dưới dạng 5-7 dòng ngắn gọn.
Nếu không có thông tin, hãy nói 'Không có dữ liệu'.

Dữ liệu:
{data}
";
    }

    private async Task<string> SendPrompt(string prompt)
    {
        var apiKey = _config["Groq:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            return "Chưa cấu hình Groq API key.";
        }

        var baseUrl = _config["Groq:BaseUrl"] ?? "https://api.groq.com/openai/v1";
        var model = _config["Groq:Model"] ?? "llama-3.1-8b-instant";
        var url = $"{baseUrl}/chat/completions";

        var body = new
        {
            model = model,
            messages = new[]
            {
                new { role = "user", content = prompt }
            }
        };

        var request = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = new StringContent(
                JsonSerializer.Serialize(body),
                Encoding.UTF8,
                "application/json"
            )
        };
        request.Headers.Add("Authorization", $"Bearer {apiKey}");

        HttpResponseMessage response;
        try
        {
            response = await _httpClient.SendAsync(request);
        }
        catch (Exception ex)
        {
            return $"Lỗi gọi Groq: {ex.Message}";
        }

        var json = await response.Content.ReadAsStringAsync();
        if (!response.IsSuccessStatusCode)
        {
            var errorBody = string.IsNullOrWhiteSpace(json) ? "(empty body)" : json;
            return $"Groq error: {(int)response.StatusCode} {response.ReasonPhrase} - {errorBody}. Model={model}";
        }

        try
        {
            using var doc = JsonDocument.Parse(json);
            return doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString() ?? "Không nhận được kết quả.";
        }
        catch (Exception ex)
        {
            return $"Không đọc được phản hồi Groq: {ex.Message}";
        }
    }
}