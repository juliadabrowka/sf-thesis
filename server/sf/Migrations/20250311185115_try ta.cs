using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class tryta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trips_Articles_ArticleId",
                table: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Trips_ArticleId",
                table: "Trips");

            migrationBuilder.AddColumn<int>(
                name: "TripId1",
                table: "Articles",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Articles_TripId1",
                table: "Articles",
                column: "TripId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Trips_TripId1",
                table: "Articles",
                column: "TripId1",
                principalTable: "Trips",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Trips_TripId1",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_TripId1",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "TripId1",
                table: "Articles");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_ArticleId",
                table: "Trips",
                column: "ArticleId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_Articles_ArticleId",
                table: "Trips",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
