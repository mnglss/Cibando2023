using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CibandoServer.Migrations
{
    /// <inheritdoc />
    public partial class RenameField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsPiblished",
                table: "Recipes",
                newName: "IsPublished");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsPublished",
                table: "Recipes",
                newName: "IsPiblished");
        }
    }
}
