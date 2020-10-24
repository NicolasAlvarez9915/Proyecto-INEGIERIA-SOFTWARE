﻿// <auto-generated />
using Datos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Datos.Migrations
{
    [DbContext(typeof(DESBContext))]
    partial class DESBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Entity.Usuario", b =>
                {
                    b.Property<string>("Correo")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Contraseña")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("IdPersona")
                        .HasColumnType("nvarchar(11)");

                    b.Property<string>("Rol")
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Correo");

                    b.ToTable("Usuarios");
                });
#pragma warning restore 612, 618
        }
    }
}
