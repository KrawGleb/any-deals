using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaM.AnyDeals.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddChatEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ChatId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "ChatDbEntry",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatDbEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChatDbEntry_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MessageDbEntry",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ChatId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SenderId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageDbEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MessageDbEntry_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_MessageDbEntry_ChatDbEntry_ChatId",
                        column: x => x.ChatId,
                        principalTable: "ChatDbEntry",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChatDbEntry_OrderId",
                table: "ChatDbEntry",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MessageDbEntry_ChatId",
                table: "MessageDbEntry",
                column: "ChatId");

            migrationBuilder.CreateIndex(
                name: "IX_MessageDbEntry_SenderId",
                table: "MessageDbEntry",
                column: "SenderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MessageDbEntry");

            migrationBuilder.DropTable(
                name: "ChatDbEntry");

            migrationBuilder.DropColumn(
                name: "ChatId",
                table: "Orders");
        }
    }
}
