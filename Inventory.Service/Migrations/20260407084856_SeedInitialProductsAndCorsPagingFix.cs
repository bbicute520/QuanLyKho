using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Inventory.Service.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialProductsAndCorsPagingFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] = N'Id' AND [object_id] = OBJECT_ID(N'[Categories]'))
    SET IDENTITY_INSERT [Categories] ON;

IF NOT EXISTS (SELECT 1 FROM [Categories] WHERE [Id] = 1)
    INSERT INTO [Categories] ([Id], [Name]) VALUES (1, N'Điện tử');
IF NOT EXISTS (SELECT 1 FROM [Categories] WHERE [Id] = 2)
    INSERT INTO [Categories] ([Id], [Name]) VALUES (2, N'Gia dụng');
IF NOT EXISTS (SELECT 1 FROM [Categories] WHERE [Id] = 3)
    INSERT INTO [Categories] ([Id], [Name]) VALUES (3, N'Thực phẩm');

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] = N'Id' AND [object_id] = OBJECT_ID(N'[Categories]'))
    SET IDENTITY_INSERT [Categories] OFF;

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] = N'Id' AND [object_id] = OBJECT_ID(N'[Products]'))
    SET IDENTITY_INSERT [Products] ON;

IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 1)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (1, N'Điện tử', NULL, 10, N'Laptop Dell XPS 15', 50, N'Cái');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 2)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (2, N'Điện tử', NULL, 20, N'Bàn phím cơ Logitech', 120, N'Cái');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 3)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (3, N'Gia dụng', NULL, 5, N'Nồi chiên không dầu', 30, N'Cái');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 4)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (4, N'Thực phẩm', NULL, 50, N'Nước mắm Nam Ngư', 500, N'Chai');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 5)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (5, N'Điện tử', NULL, 15, N'Chuột không dây Microsoft', 85, N'Cái');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 6)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (6, N'Điện tử', NULL, 8, N'Tai nghe Sony WH-CH520', 40, N'Cái');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 7)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (7, N'Điện tử', NULL, 12, N'Sạc dự phòng Anker 20000mAh', 65, N'Cái');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 8)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (8, N'Gia dụng', NULL, 10, N'Ấm siêu tốc Philips', 55, N'Cái');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 9)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (9, N'Gia dụng', NULL, 5, N'Máy hút bụi cầm tay', 22, N'Cái');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 10)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (10, N'Gia dụng', NULL, 8, N'Nồi cơm điện Sharp', 48, N'Cái');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 11)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (11, N'Gia dụng', NULL, 25, N'Bột giặt OMO 3kg', 140, N'Gói');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 12)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (12, N'Thực phẩm', NULL, 40, N'Mì ăn liền Hảo Hảo', 260, N'Thùng');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 13)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (13, N'Thực phẩm', NULL, 30, N'Gạo ST25', 180, N'Bao');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 14)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (14, N'Thực phẩm', NULL, 35, N'Dầu ăn Neptune', 210, N'Chai');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 15)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (15, N'Thực phẩm', NULL, 60, N'Sữa tươi Vinamilk', 320, N'Lốc');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 16)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (16, N'Thực phẩm', NULL, 25, N'Đường Biên Hòa', 175, N'Kg');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 17)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (17, N'Gia dụng', NULL, 20, N'Nước rửa chén Sunlight', 110, N'Chai');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 18)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (18, N'Điện tử', NULL, 18, N'Bóng đèn LED Rạng Đông', 95, N'Bóng');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 19)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (19, N'Điện tử', NULL, 12, N'Ổ cắm điện Lioa', 70, N'Cái');
IF NOT EXISTS (SELECT 1 FROM [Products] WHERE [Id] = 20)
    INSERT INTO [Products] ([Id], [Category], [ImageUrl], [MinStock], [Name], [Stock], [Unit]) VALUES (20, N'Gia dụng', NULL, 40, N'Khăn giấy Pulppy', 240, N'Gói');

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] = N'Id' AND [object_id] = OBJECT_ID(N'[Products]'))
    SET IDENTITY_INSERT [Products] OFF;
");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 20);
        }
    }
}
