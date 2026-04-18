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
- Node.js 20+ (de chay frontend)

## Chay bang Docker

1. Tao file .env o thu muc goc (neu chua co):

```
Groq__ApiKey=YOUR_GROQ_KEY
Groq__Model=llama-3.1-8b-instant
Groq__BaseUrl=https://api.groq.com/openai/v1
DB_PASSWORD=YourStrong@Pass123
```

2. Run backend + ha tang:

```
docker compose up -d --build
```

3. Sau khi container len, migration cua Auth/Inventory/Supplier se tu dong chay.
4. (Tuy chon) Neu muon co du lieu giao dich demo 5 ngay gan nhat, chay PowerShell command sau o thu muc goc:

```
Get-Content .\scripts\seed_demo_last5days.sql -Raw | docker exec -i sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "YourStrong@Pass123" -d WarehouseDB -C
```

Thay "YourStrong@Pass123" bang gia tri DB_PASSWORD trong file .env.
Neu khong dung command, co the import file scripts/seed_demo_last5days.sql bang SSMS/Azure Data Studio.

## Frontend

Sau khi backend da len:

```
cd frontend
npm install
npm run dev
```

## Quy uoc du lieu khi lam viec nhom

- Khong push duoc du lieu runtime ben trong Docker volume len Git.
- De thanh vien pull ve co du lieu san: can commit migration + seed script (hoac backup .bacpac/.sql snapshot).
- Du an nay da co seed co ban trong migration (Inventory, Supplier) va script demo: scripts/seed_demo_last5days.sql.

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
