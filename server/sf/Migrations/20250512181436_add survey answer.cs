using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class addsurveyanswer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SurveyAnswer_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_SurveyAnswer_SurveyResponses_SurveyResponseId",
                table: "SurveyAnswer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SurveyAnswer",
                table: "SurveyAnswer");

            migrationBuilder.RenameTable(
                name: "SurveyAnswer",
                newName: "SurveyAnswers");

            migrationBuilder.RenameIndex(
                name: "IX_SurveyAnswer_SurveyResponseId",
                table: "SurveyAnswers",
                newName: "IX_SurveyAnswers_SurveyResponseId");

            migrationBuilder.RenameIndex(
                name: "IX_SurveyAnswer_SurveyQuestionId",
                table: "SurveyAnswers",
                newName: "IX_SurveyAnswers_SurveyQuestionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SurveyAnswers",
                table: "SurveyAnswers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyAnswers_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswers",
                column: "SurveyQuestionId",
                principalTable: "SurveyQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyAnswers_SurveyResponses_SurveyResponseId",
                table: "SurveyAnswers",
                column: "SurveyResponseId",
                principalTable: "SurveyResponses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SurveyAnswers_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswers");

            migrationBuilder.DropForeignKey(
                name: "FK_SurveyAnswers_SurveyResponses_SurveyResponseId",
                table: "SurveyAnswers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SurveyAnswers",
                table: "SurveyAnswers");

            migrationBuilder.RenameTable(
                name: "SurveyAnswers",
                newName: "SurveyAnswer");

            migrationBuilder.RenameIndex(
                name: "IX_SurveyAnswers_SurveyResponseId",
                table: "SurveyAnswer",
                newName: "IX_SurveyAnswer_SurveyResponseId");

            migrationBuilder.RenameIndex(
                name: "IX_SurveyAnswers_SurveyQuestionId",
                table: "SurveyAnswer",
                newName: "IX_SurveyAnswer_SurveyQuestionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SurveyAnswer",
                table: "SurveyAnswer",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyAnswer_SurveyQuestions_SurveyQuestionId",
                table: "SurveyAnswer",
                column: "SurveyQuestionId",
                principalTable: "SurveyQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyAnswer_SurveyResponses_SurveyResponseId",
                table: "SurveyAnswer",
                column: "SurveyResponseId",
                principalTable: "SurveyResponses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
