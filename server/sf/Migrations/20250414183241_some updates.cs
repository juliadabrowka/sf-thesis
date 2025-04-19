using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class someupdates : Migration
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

            migrationBuilder.DropColumn(
                name: "ArticleId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "SurveyResponseId",
                table: "TripApplications");

            migrationBuilder.AddColumn<int>(
                name: "TripId1",
                table: "TripTerms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TripId2",
                table: "TripTerms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int[]>(
                name: "SurveyQuestionIds",
                table: "Surveys",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);

            migrationBuilder.CreateIndex(
                name: "IX_TripTerms_TripId1",
                table: "TripTerms",
                column: "TripId1");

            migrationBuilder.CreateIndex(
                name: "IX_Articles_TripId",
                table: "Articles",
                column: "TripId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Trips_TripId",
                table: "Articles",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripTerms_Trips_TripId1",
                table: "TripTerms",
                column: "TripId1",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Trips_TripId",
                table: "Articles");

            migrationBuilder.DropForeignKey(
                name: "FK_TripTerms_Trips_TripId1",
                table: "TripTerms");

            migrationBuilder.DropIndex(
                name: "IX_TripTerms_TripId1",
                table: "TripTerms");

            migrationBuilder.DropIndex(
                name: "IX_Articles_TripId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "TripId1",
                table: "TripTerms");

            migrationBuilder.DropColumn(
                name: "TripId2",
                table: "TripTerms");

            migrationBuilder.DropColumn(
                name: "SurveyQuestionIds",
                table: "Surveys");

            migrationBuilder.AddColumn<int>(
                name: "ArticleId",
                table: "Trips",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SurveyResponseId",
                table: "TripApplications",
                type: "integer",
                nullable: true);

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
