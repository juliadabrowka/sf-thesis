using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class a : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArticleId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "SurveyResponseId",
                table: "TripApplications");

            migrationBuilder.AddColumn<int[]>(
                name: "SurveyQuestionIds",
                table: "Surveys",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);
        }
    }
}
