using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaM.AnyDeals.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class FixAdvertToContactsFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Adverts_Contacts_ContactsId",
                table: "Adverts");

            migrationBuilder.DropIndex(
                name: "IX_Adverts_ContactsId",
                table: "Adverts");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_AdvertId",
                table: "Contacts",
                column: "AdvertId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Adverts_AdvertId",
                table: "Contacts",
                column: "AdvertId",
                principalTable: "Adverts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Adverts_AdvertId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_AdvertId",
                table: "Contacts");

            migrationBuilder.CreateIndex(
                name: "IX_Adverts_ContactsId",
                table: "Adverts",
                column: "ContactsId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Adverts_Contacts_ContactsId",
                table: "Adverts",
                column: "ContactsId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
