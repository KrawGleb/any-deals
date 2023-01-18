using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaM.AnyDeals.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderDbEntry",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdvertId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ExecutorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    HasCustomerApproval = table.Column<bool>(type: "bit", nullable: false),
                    HasExecutorApproval = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDbEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderDbEntry_Adverts_AdvertId",
                        column: x => x.AdvertId,
                        principalTable: "Adverts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrderDbEntry_AspNetUsers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrderDbEntry_AspNetUsers_ExecutorId",
                        column: x => x.ExecutorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "A3BF16BB-378C-4350-8BFF-FF1ED9CB2915",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "f8f7f881-1a3d-46d6-a74e-17bcd658cc46", "30114e5f-fa10-44df-81a8-9a250136a760" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderDbEntry_AdvertId",
                table: "OrderDbEntry",
                column: "AdvertId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDbEntry_CustomerId",
                table: "OrderDbEntry",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDbEntry_ExecutorId",
                table: "OrderDbEntry",
                column: "ExecutorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderDbEntry");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "A3BF16BB-378C-4350-8BFF-FF1ED9CB2915",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "5e81cb42-e1d8-48f6-8519-f5c2f316872f", "d5029aef-8ae5-4f6c-8ee7-2d4f793cf3b8" });
        }
    }
}
