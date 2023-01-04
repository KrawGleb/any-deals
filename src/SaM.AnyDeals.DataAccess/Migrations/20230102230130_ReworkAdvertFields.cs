using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaM.AnyDeals.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ReworkAdvertFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCommertial",
                table: "Adverts");

            migrationBuilder.DropColumn(
                name: "IsOffline",
                table: "Adverts");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Adverts",
                newName: "Interest");

            migrationBuilder.RenameColumn(
                name: "SubCategory",
                table: "Adverts",
                newName: "Group");

            migrationBuilder.AddColumn<int>(
                name: "Goal",
                table: "Adverts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Goal",
                table: "Adverts");

            migrationBuilder.RenameColumn(
                name: "Interest",
                table: "Adverts",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Group",
                table: "Adverts",
                newName: "SubCategory");

            migrationBuilder.AddColumn<bool>(
                name: "IsCommertial",
                table: "Adverts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsOffline",
                table: "Adverts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
