using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class removebgpicfromsureey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BackgroundImageUrl",
                table: "Surveys");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BackgroundImageUrl",
                table: "Surveys",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
