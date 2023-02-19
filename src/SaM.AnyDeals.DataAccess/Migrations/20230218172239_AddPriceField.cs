using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaM.AnyDeals.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddPriceField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Adverts",
                type: "decimal(18,2)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Adverts");
        }
    }
}
