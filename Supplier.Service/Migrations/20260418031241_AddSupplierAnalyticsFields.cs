using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Supplier.Service.Migrations
{
    /// <inheritdoc />
    public partial class AddSupplierAnalyticsFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastTransactionAt",
                table: "Suppliers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ReliabilityScore",
                table: "Suppliers",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalImportValue",
                table: "Suppliers",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "TotalTransactions",
                table: "Suppliers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "LastTransactionAt", "ReliabilityScore", "TotalImportValue", "TotalTransactions" },
                values: new object[] { null, 0m, 0m, 0 });

            migrationBuilder.UpdateData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "LastTransactionAt", "ReliabilityScore", "TotalImportValue", "TotalTransactions" },
                values: new object[] { null, 0m, 0m, 0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastTransactionAt",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "ReliabilityScore",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "TotalImportValue",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "TotalTransactions",
                table: "Suppliers");
        }
    }
}
