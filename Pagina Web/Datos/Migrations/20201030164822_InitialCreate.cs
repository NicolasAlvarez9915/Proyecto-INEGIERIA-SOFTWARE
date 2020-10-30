using Microsoft.EntityFrameworkCore.Migrations;

namespace Datos.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Administradores",
                columns: table => new
                {
                    Identificacion = table.Column<string>(type: "nvarchar(11)", nullable: false),
                    Nombres = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Apellidos = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Telefono = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    Whatsapp = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    Puesto = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administradores", x => x.Identificacion);
                });

            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    Identificacion = table.Column<string>(type: "nvarchar(11)", nullable: false),
                    Nombres = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Apellidos = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Telefono = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    Whatsapp = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    Direccion = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Horaio = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Identificacion);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Correo = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    IdPersona = table.Column<string>(type: "nvarchar(11)", nullable: true),
                    Contraseña = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Rol = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Correo);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administradores");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
