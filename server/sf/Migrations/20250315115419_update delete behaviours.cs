using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class updatedeletebehaviours : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SurveyAnswer_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_TripApplications_Trips_TripId",
                table: "TripApplications");

            migrationBuilder.DropForeignKey(
                name: "FK_Trips_Articles_ArticleId",
                table: "Trips");

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyAnswer_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswer",
                column: "SurveyQuestionId",
                principalTable: "SurveyQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripApplications_Trips_TripId",
                table: "TripApplications",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
                name: "FK_SurveyAnswer_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_TripApplications_Trips_TripId",
                table: "TripApplications");

            migrationBuilder.DropForeignKey(
                name: "FK_Trips_Articles_ArticleId",
                table: "Trips");

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyAnswer_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswer",
                column: "SurveyQuestionId",
                principalTable: "SurveyQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TripApplications_Trips_TripId",
                table: "TripApplications",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_Articles_ArticleId",
                table: "Trips",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
