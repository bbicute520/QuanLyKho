SET NOCOUNT ON;

IF NOT EXISTS (SELECT 1 FROM dbo.Products WHERE Id = 20)
BEGIN
    RAISERROR(N'Products chưa sẵn sàng. Hãy chạy migration/seed Product trước.', 16, 1);
    RETURN;
END;

IF EXISTS (SELECT 1 FROM dbo.StockTransactions WHERE Note LIKE N'[[]SEED5D[]]%')
BEGIN
    PRINT N'Dữ liệu demo 5 ngày đã tồn tại, bỏ qua seed trùng.';
    SELECT COUNT(*) AS ExistingSeedRows
    FROM dbo.StockTransactions
    WHERE Note LIKE N'[[]SEED5D[]]%';
    RETURN;
END;

DECLARE @baseDate DATE = DATEADD(DAY, -5, CAST(GETDATE() AS DATE));
DECLARE @d1 DATETIME2 = DATEADD(HOUR, 9, CAST(@baseDate AS DATETIME2));
DECLARE @d2 DATETIME2 = DATEADD(DAY, 1, @d1);
DECLARE @d3 DATETIME2 = DATEADD(DAY, 2, @d1);
DECLARE @d4 DATETIME2 = DATEADD(DAY, 3, @d1);
DECLARE @d5 DATETIME2 = DATEADD(DAY, 4, @d1);

BEGIN TRY
    BEGIN TRAN;

    DECLARE @ir1 INT, @ir2 INT, @ir3 INT, @ir4 INT, @ir5 INT, @ir6 INT, @ir7 INT, @ir8 INT, @ir9 INT, @ir10 INT;
    DECLARE @er1 INT, @er2 INT, @er3 INT, @er4 INT, @er5 INT, @er6 INT, @er7 INT, @er8 INT, @er9 INT, @er10 INT;

    -- DAY 1 (5 ngày trước)
    INSERT INTO dbo.ImportReceipts (Note, SupplierId, ImportDate)
    VALUES (N'[SEED5D] Nhập demo ngày 1 - lô laptop', 1, DATEADD(MINUTE, 0, @d1));
    SET @ir1 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (1, N'IMPORT', 12, 24500000, 1, DATEADD(MINUTE, 5, @d1), N'[SEED5D] Nhập theo phiếu ' + CAST(@ir1 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock + 12 WHERE Id = 1;

    INSERT INTO dbo.ImportReceipts (Note, SupplierId, ImportDate)
    VALUES (N'[SEED5D] Nhập demo ngày 1 - lô nước mắm', 2, DATEADD(MINUTE, 10, @d1));
    SET @ir2 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (4, N'IMPORT', 80, 29000, 2, DATEADD(MINUTE, 12, @d1), N'[SEED5D] Nhập theo phiếu ' + CAST(@ir2 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock + 80 WHERE Id = 4;

    INSERT INTO dbo.ExportReceipts (Reason, ExportDate)
    VALUES (N'[SEED5D] Xuất demo ngày 1 - đơn bán laptop', DATEADD(MINUTE, 30, @d1));
    SET @er1 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (1, N'EXPORT', 4, 28900000, NULL, DATEADD(MINUTE, 35, @d1), N'[SEED5D] Xuất theo phiếu ' + CAST(@er1 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock - 4 WHERE Id = 1;

    INSERT INTO dbo.ExportReceipts (Reason, ExportDate)
    VALUES (N'[SEED5D] Xuất demo ngày 1 - đơn bán nước mắm', DATEADD(MINUTE, 45, @d1));
    SET @er2 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (4, N'EXPORT', 25, 36000, NULL, DATEADD(MINUTE, 48, @d1), N'[SEED5D] Xuất theo phiếu ' + CAST(@er2 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock - 25 WHERE Id = 4;

    -- DAY 2
    INSERT INTO dbo.ImportReceipts (Note, SupplierId, ImportDate)
    VALUES (N'[SEED5D] Nhập demo ngày 2 - bàn phím', 1, DATEADD(MINUTE, 0, @d2));
    SET @ir3 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (2, N'IMPORT', 30, 1500000, 1, DATEADD(MINUTE, 3, @d2), N'[SEED5D] Nhập theo phiếu ' + CAST(@ir3 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock + 30 WHERE Id = 2;

    INSERT INTO dbo.ImportReceipts (Note, SupplierId, ImportDate)
    VALUES (N'[SEED5D] Nhập demo ngày 2 - ấm siêu tốc', 2, DATEADD(MINUTE, 12, @d2));
    SET @ir4 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (8, N'IMPORT', 20, 520000, 2, DATEADD(MINUTE, 15, @d2), N'[SEED5D] Nhập theo phiếu ' + CAST(@ir4 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock + 20 WHERE Id = 8;

    INSERT INTO dbo.ExportReceipts (Reason, ExportDate)
    VALUES (N'[SEED5D] Xuất demo ngày 2 - đơn bàn phím', DATEADD(MINUTE, 35, @d2));
    SET @er3 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (2, N'EXPORT', 12, 1890000, NULL, DATEADD(MINUTE, 38, @d2), N'[SEED5D] Xuất theo phiếu ' + CAST(@er3 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock - 12 WHERE Id = 2;

    INSERT INTO dbo.ExportReceipts (Reason, ExportDate)
    VALUES (N'[SEED5D] Xuất demo ngày 2 - đơn ấm siêu tốc', DATEADD(MINUTE, 50, @d2));
    SET @er4 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (8, N'EXPORT', 6, 690000, NULL, DATEADD(MINUTE, 52, @d2), N'[SEED5D] Xuất theo phiếu ' + CAST(@er4 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock - 6 WHERE Id = 8;

    -- DAY 3
    INSERT INTO dbo.ImportReceipts (Note, SupplierId, ImportDate)
    VALUES (N'[SEED5D] Nhập demo ngày 3 - mì ăn liền', 2, DATEADD(MINUTE, 0, @d3));
    SET @ir5 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (12, N'IMPORT', 40, 92000, 2, DATEADD(MINUTE, 4, @d3), N'[SEED5D] Nhập theo phiếu ' + CAST(@ir5 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock + 40 WHERE Id = 12;

    INSERT INTO dbo.ImportReceipts (Note, SupplierId, ImportDate)
    VALUES (N'[SEED5D] Nhập demo ngày 3 - chuột không dây', 1, DATEADD(MINUTE, 8, @d3));
    SET @ir6 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (5, N'IMPORT', 15, 320000, 1, DATEADD(MINUTE, 11, @d3), N'[SEED5D] Nhập theo phiếu ' + CAST(@ir6 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock + 15 WHERE Id = 5;

    INSERT INTO dbo.ExportReceipts (Reason, ExportDate)
    VALUES (N'[SEED5D] Xuất demo ngày 3 - đơn mì', DATEADD(MINUTE, 35, @d3));
    SET @er5 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (12, N'EXPORT', 18, 128000, NULL, DATEADD(MINUTE, 38, @d3), N'[SEED5D] Xuất theo phiếu ' + CAST(@er5 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock - 18 WHERE Id = 12;

    INSERT INTO dbo.ExportReceipts (Reason, ExportDate)
    VALUES (N'[SEED5D] Xuất demo ngày 3 - đơn chuột', DATEADD(MINUTE, 48, @d3));
    SET @er6 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (5, N'EXPORT', 5, 450000, NULL, DATEADD(MINUTE, 51, @d3), N'[SEED5D] Xuất theo phiếu ' + CAST(@er6 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock - 5 WHERE Id = 5;

    -- DAY 4
    INSERT INTO dbo.ImportReceipts (Note, SupplierId, ImportDate)
    VALUES (N'[SEED5D] Nhập demo ngày 4 - nồi chiên', 2, DATEADD(MINUTE, 0, @d4));
    SET @ir7 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (3, N'IMPORT', 10, 1450000, 2, DATEADD(MINUTE, 3, @d4), N'[SEED5D] Nhập theo phiếu ' + CAST(@ir7 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock + 10 WHERE Id = 3;

    INSERT INTO dbo.ImportReceipts (Note, SupplierId, ImportDate)
    VALUES (N'[SEED5D] Nhập demo ngày 4 - sữa tươi', 1, DATEADD(MINUTE, 12, @d4));
    SET @ir8 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (15, N'IMPORT', 35, 210000, 1, DATEADD(MINUTE, 15, @d4), N'[SEED5D] Nhập theo phiếu ' + CAST(@ir8 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock + 35 WHERE Id = 15;

    INSERT INTO dbo.ExportReceipts (Reason, ExportDate)
    VALUES (N'[SEED5D] Xuất demo ngày 4 - đơn nồi chiên', DATEADD(MINUTE, 35, @d4));
    SET @er7 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (3, N'EXPORT', 4, 1850000, NULL, DATEADD(MINUTE, 38, @d4), N'[SEED5D] Xuất theo phiếu ' + CAST(@er7 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock - 4 WHERE Id = 3;

    INSERT INTO dbo.ExportReceipts (Reason, ExportDate)
    VALUES (N'[SEED5D] Xuất demo ngày 4 - đơn sữa', DATEADD(MINUTE, 48, @d4));
    SET @er8 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (15, N'EXPORT', 12, 255000, NULL, DATEADD(MINUTE, 52, @d4), N'[SEED5D] Xuất theo phiếu ' + CAST(@er8 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock - 12 WHERE Id = 15;

    -- DAY 5 (hôm qua)
    INSERT INTO dbo.ImportReceipts (Note, SupplierId, ImportDate)
    VALUES (N'[SEED5D] Nhập demo ngày 5 - sạc dự phòng', 1, DATEADD(MINUTE, 0, @d5));
    SET @ir9 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (7, N'IMPORT', 20, 420000, 1, DATEADD(MINUTE, 4, @d5), N'[SEED5D] Nhập theo phiếu ' + CAST(@ir9 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock + 20 WHERE Id = 7;

    INSERT INTO dbo.ImportReceipts (Note, SupplierId, ImportDate)
    VALUES (N'[SEED5D] Nhập demo ngày 5 - nồi cơm điện', 2, DATEADD(MINUTE, 10, @d5));
    SET @ir10 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (10, N'IMPORT', 12, 980000, 2, DATEADD(MINUTE, 14, @d5), N'[SEED5D] Nhập theo phiếu ' + CAST(@ir10 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock + 12 WHERE Id = 10;

    INSERT INTO dbo.ExportReceipts (Reason, ExportDate)
    VALUES (N'[SEED5D] Xuất demo ngày 5 - đơn sạc dự phòng', DATEADD(MINUTE, 35, @d5));
    SET @er9 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (7, N'EXPORT', 7, 550000, NULL, DATEADD(MINUTE, 38, @d5), N'[SEED5D] Xuất theo phiếu ' + CAST(@er9 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock - 7 WHERE Id = 7;

    INSERT INTO dbo.ExportReceipts (Reason, ExportDate)
    VALUES (N'[SEED5D] Xuất demo ngày 5 - đơn nồi cơm điện', DATEADD(MINUTE, 48, @d5));
    SET @er10 = SCOPE_IDENTITY();

    INSERT INTO dbo.StockTransactions (ProductId, TransactionType, Quantity, UnitPrice, SupplierId, TransactionDate, Note)
    VALUES (10, N'EXPORT', 5, 1250000, NULL, DATEADD(MINUTE, 52, @d5), N'[SEED5D] Xuất theo phiếu ' + CAST(@er10 AS NVARCHAR(20)));
    UPDATE dbo.Products SET Stock = Stock - 5 WHERE Id = 10;

    COMMIT;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK;

    DECLARE @err NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@err, 16, 1);
END CATCH;

SELECT COUNT(*) AS SeededRows
FROM dbo.StockTransactions
WHERE Note LIKE N'[[]SEED5D[]]%';

SELECT TOP (20)
    Id,
    ProductId,
    TransactionType,
    Quantity,
    UnitPrice,
    SupplierId,
    TransactionDate,
    Note
FROM dbo.StockTransactions
WHERE Note LIKE N'[[]SEED5D[]]%'
ORDER BY TransactionDate DESC;
