using System;
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
                name: "Domiciliarios",
                columns: table => new
                {
                    Identificacion = table.Column<string>(type: "nvarchar(11)", nullable: false),
                    Nombres = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Apellidos = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Telefono = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    Whatsapp = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    FechaPermisoConduccion = table.Column<DateTime>(type: "Date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Domiciliarios", x => x.Identificacion);
                });

            migrationBuilder.CreateTable(
                name: "ImagenProductos",
                columns: table => new
                {
                    CodProducto = table.Column<string>(type: "nvarchar(11)", nullable: false),
                    Imagen = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImagenProductos", x => x.CodProducto);
                });

            migrationBuilder.CreateTable(
                name: "Pedidos",
                columns: table => new
                {
                    Codigo = table.Column<string>(type: "nvarchar(11)", nullable: false),
                    IdPersona = table.Column<string>(type: "nvarchar(11)", nullable: true),
                    Fecha = table.Column<DateTime>(type: "Date", nullable: false),
                    SubTotal = table.Column<float>(type: "real", nullable: false),
                    Iva = table.Column<int>(type: "int", nullable: false),
                    TotalIva = table.Column<float>(type: "real", nullable: false),
                    Total = table.Column<float>(type: "real", nullable: false),
                    Descuento = table.Column<float>(type: "real", nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(11)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedidos", x => x.Codigo);
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
                name: "Vehiculos",
                columns: table => new
                {
                    Placa = table.Column<string>(type: "nvarchar(8)", nullable: false),
                    IdDomiciliario = table.Column<string>(type: "nvarchar(11)", nullable: true),
                    FechaSoat = table.Column<DateTime>(type: "Date", nullable: false),
                    FechaTecnoMecanica = table.Column<DateTime>(type: "Date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehiculos", x => x.Placa);
                });

            migrationBuilder.CreateTable(
                name: "Descuentos",
                columns: table => new
                {
                    Codigo = table.Column<string>(type: "nvarchar(11)", nullable: false),
                    Porcentaje = table.Column<float>(type: "real", nullable: false),
                    CodProducto = table.Column<string>(type: "nvarchar(11)", nullable: true),
                    NombreProducto = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    IdPersona = table.Column<string>(type: "nvarchar(11)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Descuentos", x => x.Codigo);
                    table.ForeignKey(
                        name: "FK_Descuentos_Clientes_IdPersona",
                        column: x => x.IdPersona,
                        principalTable: "Clientes",
                        principalColumn: "Identificacion",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DetalleDePedidos",
                columns: table => new
                {
                    Codigo = table.Column<string>(type: "nvarchar(11)", nullable: false),
                    CodPedido = table.Column<string>(type: "nvarchar(11)", nullable: true),
                    Descripcion = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    CodProducto = table.Column<string>(type: "nvarchar(11)", nullable: true),
                    Descuento = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<float>(type: "real", nullable: false),
                    ValorUnitario = table.Column<float>(type: "real", nullable: false),
                    TotalDescuento = table.Column<float>(type: "real", nullable: false),
                    SubTotal = table.Column<float>(type: "real", nullable: false),
                    TotalConDescuento = table.Column<float>(type: "real", nullable: false),
                    total = table.Column<float>(type: "real", nullable: false),
                    CondPedido = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleDePedidos", x => x.Codigo);
                    table.ForeignKey(
                        name: "FK_DetalleDePedidos_Pedidos_CondPedido",
                        column: x => x.CondPedido,
                        principalTable: "Pedidos",
                        principalColumn: "Codigo",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Descuentos_IdPersona",
                table: "Descuentos",
                column: "IdPersona");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleDePedidos_CondPedido",
                table: "DetalleDePedidos",
                column: "CondPedido");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administradores");

            migrationBuilder.DropTable(
                name: "Descuentos");

            migrationBuilder.DropTable(
                name: "DetalleDePedidos");

            migrationBuilder.DropTable(
                name: "Domiciliarios");

            migrationBuilder.DropTable(
                name: "ImagenProductos");

            migrationBuilder.DropTable(
                name: "Productos");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Vehiculos");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "Pedidos");
        }
    }
}
