using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class addsomenullables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Trips_TripId1",
                table: "Articles");

            migrationBuilder.DropForeignKey(
                name: "FK_SurveyAnswer_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_Surveys_Trips_TripId",
                table: "Surveys");

            migrationBuilder.DropForeignKey(
                name: "FK_TripApplications_Trips_TripId",
                table: "TripApplications");

            migrationBuilder.DropIndex(
                name: "IX_Articles_TripId1",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "TripId1",
                table: "Articles");

            migrationBuilder.AlterColumn<int>(
                name: "ArticleId",
                table: "Trips",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_ArticleId",
                table: "Trips",
                column: "ArticleId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyAnswer_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswer",
                column: "SurveyQuestionId",
                principalTable: "SurveyQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Surveys_Trips_TripId",
                table: "Surveys",
                column: "TripId",
                principalTable: "Trips",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SurveyAnswer_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_Surveys_Trips_TripId",
                table: "Surveys");

            migrationBuilder.DropForeignKey(
                name: "FK_TripApplications_Trips_TripId",
                table: "TripApplications");

            migrationBuilder.DropForeignKey(
                name: "FK_Trips_Articles_ArticleId",
                table: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Trips_ArticleId",
                table: "Trips");

            migrationBuilder.AlterColumn<int>(
                name: "ArticleId",
                table: "Trips",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyAnswer_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswer",
                column: "SurveyQuestionId",
                principalTable: "SurveyQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Surveys_Trips_TripId",
                table: "Surveys",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TripApplications_Trips_TripId",
                table: "TripApplications",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
