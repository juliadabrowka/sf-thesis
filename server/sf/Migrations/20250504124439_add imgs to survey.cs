using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class addimgstosurvey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Surveys_Trips_TripId",
                table: "Surveys");

            migrationBuilder.DropIndex(
                name: "IX_Surveys_TripId",
                table: "Surveys");

            migrationBuilder.DropColumn(
                name: "TripId",
                table: "Surveys");

            migrationBuilder.AddColumn<string>(
                name: "BackgroundImageUrl",
                table: "Surveys",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExtraLogoUrl",
                table: "Surveys",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Trips_SurveyId",
                table: "Trips",
                column: "SurveyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_Surveys_SurveyId",
                table: "Trips",
                column: "SurveyId",
                principalTable: "Surveys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trips_Surveys_SurveyId",
                table: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Trips_SurveyId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "BackgroundImageUrl",
                table: "Surveys");

            migrationBuilder.DropColumn(
                name: "ExtraLogoUrl",
                table: "Surveys");

            migrationBuilder.AddColumn<int>(
                name: "TripId",
                table: "Surveys",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Surveys_TripId",
                table: "Surveys",
                column: "TripId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Surveys_Trips_TripId",
                table: "Surveys",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id");
        }
    }
}
