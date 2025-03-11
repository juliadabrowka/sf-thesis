using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class updatetripandarticle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Trips_TripId",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_TripId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "SurveyId",
                table: "Trips");

            migrationBuilder.AddColumn<int>(
                name: "ArticleId",
                table: "Trips",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trips_Articles_ArticleId",
                table: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Trips_ArticleId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "ArticleId",
                table: "Trips");

            migrationBuilder.AddColumn<int>(
                name: "SurveyId",
                table: "Trips",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Articles_TripId",
                table: "Articles",
                column: "TripId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Trips_TripId",
                table: "Articles",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id");
        }
    }
}
