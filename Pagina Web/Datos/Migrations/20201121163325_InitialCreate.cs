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
                    Horaio = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    TipoCliente = table.Column<string>(type: "nvarchar(20)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Identificacion);
                });

            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    Codigo = table.Column<string>(type: "nvarchar(11)", nullable: false),
                    Categoria = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Nombre = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Cantidad = table.Column<float>(type: "real", nullable: false),
                    CantidadMinima = table.Column<float>(type: "real", nullable: false),
                    Valor = table.Column<int>(type: "int", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productos", x => x.Codigo);
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

            migrationBuilder.CreateTable(
                name: "Descuentos",
                columns: table => new
                {
                    Codigo = table.Column<string>(type: "nvarchar(11)", nullable: false),
                    Porcentaje = table.Column<string>(type: "nvarchar(11)", nullable: false),
                    CodProducto = table.Column<string>(type: "nvarchar(11)", nullable: true),
                    IdPersona = table.Column<string>(type: "nvarchar(11)", nullable: true),
                    ClienteIdentificacion = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Descuentos", x => x.Codigo);
                    table.ForeignKey(
                        name: "FK_Descuentos_Clientes_ClienteIdentificacion",
                        column: x => x.ClienteIdentificacion,
                        principalTable: "Clientes",
                        principalColumn: "Identificacion",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Descuentos_Clientes_IdPersona",
                        column: x => x.IdPersona,
                        principalTable: "Clientes",
                        principalColumn: "Identificacion",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Descuentos_ClienteIdentificacion",
                table: "Descuentos",
                column: "ClienteIdentificacion");

            migrationBuilder.CreateIndex(
                name: "IX_Descuentos_IdPersona",
                table: "Descuentos",
                column: "IdPersona");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administradores");

            migrationBuilder.DropTable(
                name: "Descuentos");

            migrationBuilder.DropTable(
                name: "Productos");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Clientes");
        }
    }
}
