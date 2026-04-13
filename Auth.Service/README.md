# Auth.Service

Service xac thuc cho he thong QuanLyKho.

## Chuc nang

- Dang ky tai khoan: `POST /api/auth/register`
- Dang nhap va tra JWT: `POST /api/auth/login`
- Ho tro role: `Admin`, `ThuKho`, `KeToan`
- Ho tro Session de dem so lan dang nhap sai theo phien
- Gan JWT vao HttpOnly cookie `access_token`

## Cau hinh JWT

Cau hinh trong `appsettings.json`:

```json
"Jwt": {
  "Key": "AuthService_SecretKey_AtLeast_32_Chars_2026",
  "Issuer": "QuanLyKho.AuthService",
  "Audience": "QuanLyKho.Client"
}
```

Luu y:

- `Jwt:Key` phai co toi thieu 32 ky tu.
- Khong dung secret that khi day len GitHub.

## Cach chay local

1. Dam bao SQL Server da chay.
2. Chinh `ConnectionStrings:DefaultConnection` trong `appsettings.json`.
3. Chay service:

```bash
dotnet run --project Auth.Service
```

## Cach test nhanh bang Swagger

1. Mo Swagger cua Auth.Service.
2. Goi `POST /api/auth/register` voi body:

```json
{
  "username": "admin01",
  "password": "123456",
  "role": "Admin"
}
```

3. Goi `POST /api/auth/login` voi body:

```json
{
  "username": "admin01",
  "password": "123456"
}
```

4. Lay `token` trong response va dung cho cac service can Bearer token.

## Ghi chu ve Cookie va Session

- Sau khi login thanh cong, service set cookie `access_token` (HttpOnly).
- Neu login sai, service tang `FailedLoginCount` trong Session de theo doi.
