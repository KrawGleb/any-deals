using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaM.AnyDeals.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class SetUpRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdvertDbEntry_AspNetUsers_CreatorId",
                table: "AdvertDbEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_AdvertDbEntry_CategoryDbEntry_CategoryId",
                table: "AdvertDbEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_AdvertDbEntry_CityDbEntry_CityId",
                table: "AdvertDbEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_AdvertDbEntry_ContactsDbEntry_ContactsId",
                table: "AdvertDbEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_AttachmentDbEntry_AdvertDbEntry_AdvertId",
                table: "AttachmentDbEntry");

            migrationBuilder.DropForeignKey(
                name: "FK_CityDbEntry_CountryDbEntry_CountryId",
                table: "CityDbEntry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CountryDbEntry",
                table: "CountryDbEntry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContactsDbEntry",
                table: "ContactsDbEntry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CityDbEntry",
                table: "CityDbEntry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoryDbEntry",
                table: "CategoryDbEntry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AttachmentDbEntry",
                table: "AttachmentDbEntry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AdvertDbEntry",
                table: "AdvertDbEntry");

            migrationBuilder.RenameTable(
                name: "CountryDbEntry",
                newName: "Countries");

            migrationBuilder.RenameTable(
                name: "ContactsDbEntry",
                newName: "Contacts");

            migrationBuilder.RenameTable(
                name: "CityDbEntry",
                newName: "Cities");

            migrationBuilder.RenameTable(
                name: "CategoryDbEntry",
                newName: "Categories");

            migrationBuilder.RenameTable(
                name: "AttachmentDbEntry",
                newName: "Attachments");

            migrationBuilder.RenameTable(
                name: "AdvertDbEntry",
                newName: "Adverts");

            migrationBuilder.RenameIndex(
                name: "IX_CityDbEntry_CountryId",
                table: "Cities",
                newName: "IX_Cities_CountryId");

            migrationBuilder.RenameIndex(
                name: "IX_AttachmentDbEntry_AdvertId",
                table: "Attachments",
                newName: "IX_Attachments_AdvertId");

            migrationBuilder.RenameIndex(
                name: "IX_AdvertDbEntry_CreatorId",
                table: "Adverts",
                newName: "IX_Adverts_CreatorId");

            migrationBuilder.RenameIndex(
                name: "IX_AdvertDbEntry_ContactsId",
                table: "Adverts",
                newName: "IX_Adverts_ContactsId");

            migrationBuilder.RenameIndex(
                name: "IX_AdvertDbEntry_CityId",
                table: "Adverts",
                newName: "IX_Adverts_CityId");

            migrationBuilder.RenameIndex(
                name: "IX_AdvertDbEntry_CategoryId",
                table: "Adverts",
                newName: "IX_Adverts_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Countries",
                table: "Countries",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cities",
                table: "Cities",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Attachments",
                table: "Attachments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Adverts",
                table: "Adverts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Adverts_AspNetUsers_CreatorId",
                table: "Adverts",
                column: "CreatorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Adverts_Categories_CategoryId",
                table: "Adverts",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Adverts_Cities_CityId",
                table: "Adverts",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Adverts_Contacts_ContactsId",
                table: "Adverts",
                column: "ContactsId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Attachments_Adverts_AdvertId",
                table: "Attachments",
                column: "AdvertId",
                principalTable: "Adverts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_Countries_CountryId",
                table: "Cities",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Adverts_AspNetUsers_CreatorId",
                table: "Adverts");

            migrationBuilder.DropForeignKey(
                name: "FK_Adverts_Categories_CategoryId",
                table: "Adverts");

            migrationBuilder.DropForeignKey(
                name: "FK_Adverts_Cities_CityId",
                table: "Adverts");

            migrationBuilder.DropForeignKey(
                name: "FK_Adverts_Contacts_ContactsId",
                table: "Adverts");

            migrationBuilder.DropForeignKey(
                name: "FK_Attachments_Adverts_AdvertId",
                table: "Attachments");

            migrationBuilder.DropForeignKey(
                name: "FK_Cities_Countries_CountryId",
                table: "Cities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Countries",
                table: "Countries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contacts",
                table: "Contacts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cities",
                table: "Cities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Attachments",
                table: "Attachments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Adverts",
                table: "Adverts");

            migrationBuilder.RenameTable(
                name: "Countries",
                newName: "CountryDbEntry");

            migrationBuilder.RenameTable(
                name: "Contacts",
                newName: "ContactsDbEntry");

            migrationBuilder.RenameTable(
                name: "Cities",
                newName: "CityDbEntry");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "CategoryDbEntry");

            migrationBuilder.RenameTable(
                name: "Attachments",
                newName: "AttachmentDbEntry");

            migrationBuilder.RenameTable(
                name: "Adverts",
                newName: "AdvertDbEntry");

            migrationBuilder.RenameIndex(
                name: "IX_Cities_CountryId",
                table: "CityDbEntry",
                newName: "IX_CityDbEntry_CountryId");

            migrationBuilder.RenameIndex(
                name: "IX_Attachments_AdvertId",
                table: "AttachmentDbEntry",
                newName: "IX_AttachmentDbEntry_AdvertId");

            migrationBuilder.RenameIndex(
                name: "IX_Adverts_CreatorId",
                table: "AdvertDbEntry",
                newName: "IX_AdvertDbEntry_CreatorId");

            migrationBuilder.RenameIndex(
                name: "IX_Adverts_ContactsId",
                table: "AdvertDbEntry",
                newName: "IX_AdvertDbEntry_ContactsId");

            migrationBuilder.RenameIndex(
                name: "IX_Adverts_CityId",
                table: "AdvertDbEntry",
                newName: "IX_AdvertDbEntry_CityId");

            migrationBuilder.RenameIndex(
                name: "IX_Adverts_CategoryId",
                table: "AdvertDbEntry",
                newName: "IX_AdvertDbEntry_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CountryDbEntry",
                table: "CountryDbEntry",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContactsDbEntry",
                table: "ContactsDbEntry",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CityDbEntry",
                table: "CityDbEntry",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoryDbEntry",
                table: "CategoryDbEntry",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AttachmentDbEntry",
                table: "AttachmentDbEntry",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdvertDbEntry",
                table: "AdvertDbEntry",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdvertDbEntry_AspNetUsers_CreatorId",
                table: "AdvertDbEntry",
                column: "CreatorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AdvertDbEntry_CategoryDbEntry_CategoryId",
                table: "AdvertDbEntry",
                column: "CategoryId",
                principalTable: "CategoryDbEntry",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdvertDbEntry_CityDbEntry_CityId",
                table: "AdvertDbEntry",
                column: "CityId",
                principalTable: "CityDbEntry",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AdvertDbEntry_ContactsDbEntry_ContactsId",
                table: "AdvertDbEntry",
                column: "ContactsId",
                principalTable: "ContactsDbEntry",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AttachmentDbEntry_AdvertDbEntry_AdvertId",
                table: "AttachmentDbEntry",
                column: "AdvertId",
                principalTable: "AdvertDbEntry",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CityDbEntry_CountryDbEntry_CountryId",
                table: "CityDbEntry",
                column: "CountryId",
                principalTable: "CountryDbEntry",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
