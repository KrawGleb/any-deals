using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaM.AnyDeals.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ChageOrderToChatRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Orders_OrderId",
                table: "Chats");

            migrationBuilder.DropIndex(
                name: "IX_Chats_OrderId",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Chats");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ChatId",
                table: "Orders",
                column: "ChatId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Chats_ChatId",
                table: "Orders",
                column: "ChatId",
                principalTable: "Chats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Chats_ChatId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ChatId",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "Chats",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Chats_OrderId",
                table: "Chats",
                column: "OrderId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Orders_OrderId",
                table: "Chats",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
