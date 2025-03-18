using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class miveurltoarticle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Trips");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Articles",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Articles");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Trips",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
