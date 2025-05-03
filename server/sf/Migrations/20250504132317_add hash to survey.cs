using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sf.Migrations
{
    /// <inheritdoc />
    public partial class addhashtosurvey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Hash",
                table: "Surveys",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hash",
                table: "Surveys");
        }
    }
}
