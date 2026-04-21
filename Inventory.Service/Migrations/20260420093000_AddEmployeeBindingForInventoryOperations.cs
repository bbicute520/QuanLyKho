using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inventory.Service.Migrations
{
    /// <inheritdoc />
    public partial class AddEmployeeBindingForInventoryOperations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "StockTransactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "EmployeeName",
                table: "StockTransactions",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "ImportReceipts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "EmployeeName",
                table: "ImportReceipts",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "ExportReceipts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "EmployeeName",
                table: "ExportReceipts",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.Sql(
                "UPDATE StockTransactions SET EmployeeId = CASE WHEN EmployeeId <= 0 THEN 1 ELSE EmployeeId END;");
            migrationBuilder.Sql(
                "UPDATE StockTransactions SET EmployeeName = N'LegacyUser' WHERE LEN(LTRIM(RTRIM(EmployeeName))) = 0;");

            migrationBuilder.Sql(
                "UPDATE ImportReceipts SET EmployeeId = CASE WHEN EmployeeId <= 0 THEN 1 ELSE EmployeeId END;");
            migrationBuilder.Sql(
                "UPDATE ImportReceipts SET EmployeeName = N'LegacyUser' WHERE LEN(LTRIM(RTRIM(EmployeeName))) = 0;");

            migrationBuilder.Sql(
                "UPDATE ExportReceipts SET EmployeeId = CASE WHEN EmployeeId <= 0 THEN 1 ELSE EmployeeId END;");
            migrationBuilder.Sql(
                "UPDATE ExportReceipts SET EmployeeName = N'LegacyUser' WHERE LEN(LTRIM(RTRIM(EmployeeName))) = 0;");

            migrationBuilder.AddCheckConstraint(
                name: "CK_StockTransactions_EmployeeId",
                table: "StockTransactions",
                sql: "[EmployeeId] > 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_StockTransactions_EmployeeName",
                table: "StockTransactions",
                sql: "LEN(LTRIM(RTRIM([EmployeeName]))) > 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_ImportReceipts_EmployeeId",
                table: "ImportReceipts",
                sql: "[EmployeeId] > 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_ImportReceipts_EmployeeName",
                table: "ImportReceipts",
                sql: "LEN(LTRIM(RTRIM([EmployeeName]))) > 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_ExportReceipts_EmployeeId",
                table: "ExportReceipts",
                sql: "[EmployeeId] > 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_ExportReceipts_EmployeeName",
                table: "ExportReceipts",
                sql: "LEN(LTRIM(RTRIM([EmployeeName]))) > 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_StockTransactions_EmployeeId",
                table: "StockTransactions");

            migrationBuilder.DropCheckConstraint(
                name: "CK_StockTransactions_EmployeeName",
                table: "StockTransactions");

            migrationBuilder.DropCheckConstraint(
                name: "CK_ImportReceipts_EmployeeId",
                table: "ImportReceipts");

            migrationBuilder.DropCheckConstraint(
                name: "CK_ImportReceipts_EmployeeName",
                table: "ImportReceipts");

            migrationBuilder.DropCheckConstraint(
                name: "CK_ExportReceipts_EmployeeId",
                table: "ExportReceipts");

            migrationBuilder.DropCheckConstraint(
                name: "CK_ExportReceipts_EmployeeName",
                table: "ExportReceipts");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "StockTransactions");

            migrationBuilder.DropColumn(
                name: "EmployeeName",
                table: "StockTransactions");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "ImportReceipts");

            migrationBuilder.DropColumn(
                name: "EmployeeName",
                table: "ImportReceipts");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "ExportReceipts");

            migrationBuilder.DropColumn(
                name: "EmployeeName",
                table: "ExportReceipts");
        }
    }
}
