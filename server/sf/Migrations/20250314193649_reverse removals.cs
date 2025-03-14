using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class reverseremovals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Surveys_Trips_TripId",
                table: "Surveys");

            migrationBuilder.AddColumn<int>(
                name: "SurveyId",
                table: "Trips",
                type: "integer",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Surveys_Trips_TripId",
                table: "Surveys",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Surveys_Trips_TripId",
                table: "Surveys");

            migrationBuilder.DropColumn(
                name: "SurveyId",
                table: "Trips");

            migrationBuilder.AddForeignKey(
                name: "FK_Surveys_Trips_TripId",
                table: "Surveys",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
