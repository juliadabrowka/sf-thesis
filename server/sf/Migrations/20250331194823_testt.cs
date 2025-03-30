using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class testt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TripTerm_Trips_TripId",
                table: "TripTerm");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TripTerm",
                table: "TripTerm");

            migrationBuilder.RenameTable(
                name: "TripTerm",
                newName: "TripTerms");

            migrationBuilder.RenameIndex(
                name: "IX_TripTerm_TripId",
                table: "TripTerms",
                newName: "IX_TripTerms_TripId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TripTerms",
                table: "TripTerms",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TripTerms_Trips_TripId",
                table: "TripTerms",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TripTerms_Trips_TripId",
                table: "TripTerms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TripTerms",
                table: "TripTerms");

            migrationBuilder.RenameTable(
                name: "TripTerms",
                newName: "TripTerm");

            migrationBuilder.RenameIndex(
                name: "IX_TripTerms_TripId",
                table: "TripTerm",
                newName: "IX_TripTerm_TripId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TripTerm",
                table: "TripTerm",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TripTerm_Trips_TripId",
                table: "TripTerm",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
