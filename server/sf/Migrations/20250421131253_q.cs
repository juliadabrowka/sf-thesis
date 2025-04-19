using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class q : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TripTerms_Trips_TripId1",
                table: "TripTerms");

            migrationBuilder.DropIndex(
                name: "IX_TripTerms_TripId1",
                table: "TripTerms");

            migrationBuilder.DropColumn(
                name: "TripId1",
                table: "TripTerms");

            migrationBuilder.DropColumn(
                name: "TripId2",
                table: "TripTerms");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateIndex(
                name: "IX_TripTerms_TripId1",
                table: "TripTerms",
                column: "TripId1");

            migrationBuilder.AddForeignKey(
                name: "FK_TripTerms_Trips_TripId1",
                table: "TripTerms",
                column: "TripId1",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
