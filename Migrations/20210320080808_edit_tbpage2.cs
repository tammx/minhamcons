using Microsoft.EntityFrameworkCore.Migrations;

namespace minhlamcons.Migrations
{
    public partial class edit_tbpage2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Des",
                table: "Page",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PageType",
                table: "Page",
                type: "int",
                maxLength: 25,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ShowHomePage",
                table: "Page",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Des",
                table: "Page");

            migrationBuilder.DropColumn(
                name: "PageType",
                table: "Page");

            migrationBuilder.DropColumn(
                name: "ShowHomePage",
                table: "Page");
        }
    }
}
