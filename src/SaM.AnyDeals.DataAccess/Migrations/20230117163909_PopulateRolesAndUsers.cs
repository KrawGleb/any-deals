using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SaM.AnyDeals.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class PopulateRolesAndUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "677FFB03-B872-4D82-96AF-08A2747699D6", null, "Admin", "ADMIN" },
                    { "A98F783C-2C85-46AB-BC7D-73F766D04DB3", null, "User", "USER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "A3BF16BB-378C-4350-8BFF-FF1ED9CB2915", 0, "38991a85-a134-44e2-b554-cd9520fa4b85", "krawcevitsch@gmail.com", false, false, null, "KRAWCEVITSCH@GMAIL.COM", "CREATOR", "AQAAAAEAACcQAAAAENmR3VyO1iFAng5WjdT6ziiANQvfQFn4Qy7WHWJisPNljF6EUGibbRB9mTjpWJ2Y6A", null, false, "ef0ee259-1f3b-4d3a-b825-ca7a3b43f0b3", false, "Creator" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "677FFB03-B872-4D82-96AF-08A2747699D6", "A3BF16BB-378C-4350-8BFF-FF1ED9CB2915" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "A98F783C-2C85-46AB-BC7D-73F766D04DB3");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "677FFB03-B872-4D82-96AF-08A2747699D6", "A3BF16BB-378C-4350-8BFF-FF1ED9CB2915" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "677FFB03-B872-4D82-96AF-08A2747699D6");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "A3BF16BB-378C-4350-8BFF-FF1ED9CB2915");
        }
    }
}
