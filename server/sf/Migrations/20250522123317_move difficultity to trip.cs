using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class movedifficultitytotrip : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TripDifficultity",
                table: "TripTerms");

            migrationBuilder.AddColumn<int>(
                name: "TripDifficultity",
                table: "Trips",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TripDifficultity",
                table: "Trips");

            migrationBuilder.AddColumn<int>(
                name: "TripDifficultity",
                table: "TripTerms",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
