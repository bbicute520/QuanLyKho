# QuanLyKho

QuanLyKho la he thong quan ly kho theo mo hinh microservices. Du an gom cac service backend .NET, API Gateway (YARP) va AI service ho tro hoi dap/summary tren du lieu kho.

## Thanh phan
- ApiGateway (YARP reverse proxy)
- Auth.Service
- Inventory.Service
- Supplier.Service
- Report.Service
- AI service
- SQL Server, RabbitMQ (docker)

## Yeu cau
- Docker Desktop (Linux containers)
- .NET 8 SDK (chi can neu chay local)

## Chay bang Docker
1. Tao file .env o thu muc goc (neu chua co):
```
Groq__ApiKey=YOUR_GROQ_KEY
Groq__Model=llama-3.1-8b-instant
Groq__BaseUrl=https://api.groq.com/openai/v1
DB_PASSWORD=YourStrong@Pass123
```
2. Run:
```
docker compose up -d --build
```

## Endpoints
- Gateway: http://localhost:5000
- Auth: http://localhost:5001
- Inventory: http://localhost:5002
- Supplier: http://localhost:5003
- Report: http://localhost:5004
- AI: http://localhost:5005

## AI API
- POST /api/chat/ask
Body:
```
{"message":"Tong quan kho hien tai?"}
```

- POST /api/chat/summary

## Luu y
- Gateway khong co swagger; swagger tung service o /swagger.
- AI service can du lieu tu Inventory (endpoint /api/inventory/stock).