using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class makearticlewithmanytripspossible : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Trips_ArticleId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "TripId",
                table: "Articles");

            migrationBuilder.AddColumn<int[]>(
                name: "TripIds",
                table: "Articles",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);

            migrationBuilder.CreateIndex(
                name: "IX_Trips_ArticleId",
                table: "Trips",
                column: "ArticleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Trips_ArticleId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "TripIds",
                table: "Articles");

            migrationBuilder.AddColumn<int>(
                name: "TripId",
                table: "Articles",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Trips_ArticleId",
                table: "Trips",
                column: "ArticleId",
                unique: true);
        }
    }
}
