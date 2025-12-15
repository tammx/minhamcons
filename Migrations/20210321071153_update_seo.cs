using Microsoft.EntityFrameworkCore.Migrations;

namespace minhlamcons.Migrations
{
    public partial class update_seo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "H1Tag",
                table: "Page",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SEODescription",
                table: "Page",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SEOKeyword",
                table: "Page",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SEOTitle",
                table: "Page",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "H1Tag",
                table: "News",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SEODescription",
                table: "News",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SEOKeyword",
                table: "News",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SEOTitle",
                table: "News",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "H1Tag",
                table: "Page");

            migrationBuilder.DropColumn(
                name: "SEODescription",
                table: "Page");

            migrationBuilder.DropColumn(
                name: "SEOKeyword",
                table: "Page");

            migrationBuilder.DropColumn(
                name: "SEOTitle",
                table: "Page");

            migrationBuilder.DropColumn(
                name: "H1Tag",
                table: "News");

            migrationBuilder.DropColumn(
                name: "SEODescription",
                table: "News");

            migrationBuilder.DropColumn(
                name: "SEOKeyword",
                table: "News");

            migrationBuilder.DropColumn(
                name: "SEOTitle",
                table: "News");
        }
    }
}
