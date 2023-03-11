using System.Reflection;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaM.AnyDeals.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class LoadCityAndCountryData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                """
                DROP PROCEDURE IF EXISTS [dbo].[LoadDataFromCSV]
                """);
            
            migrationBuilder.Sql(
                """
                CREATE PROCEDURE [dbo].[LoadDataFromCSV]
                    @csvFilePath NVARCHAR(1000),
                    @tableName NVARCHAR(1000)
                AS
                BEGIN
                    DECLARE @sql NVARCHAR(MAX)
                    SET @sql = ' DELETE FROM ' + @tableName +
                               ' BULK INSERT ' + @tableName +
                               ' FROM ''' + @csvFilePath + ''' ' +
                               ' WITH ( ' +
                               ' FIELDTERMINATOR = '','', ' +
                               ' ROWTERMINATOR = ''\n'', ' +
                               ' KEEPIDENTITY)'

                    EXEC sp_executesql @sql
                END
                """);

            var dataFolder = Environment.GetEnvironmentVariable("MIGRATION_DATA_FOLDER");
            var countriesFile = Path.Combine(dataFolder, "countries.csv");
            var citiesFile = Path.Combine(dataFolder, "cities.csv");
            
            migrationBuilder.Sql(
                $"""
                    EXEC [dbo].[LoadDataFromCSV] '{countriesFile}', 'Countries'
                """);
            migrationBuilder.Sql(
                $"""
                    EXEC [dbo].[LoadDataFromCSV] '{citiesFile}', 'Cities'
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
