using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class movehashtotripapplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hash",
                table: "Surveys");

            migrationBuilder.AddColumn<string>(
                name: "Hash",
                table: "TripApplications",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hash",
                table: "TripApplications");

            migrationBuilder.AddColumn<string>(
                name: "Hash",
                table: "Surveys",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
