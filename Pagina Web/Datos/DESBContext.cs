using System;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace Datos
{
    public class DESBContext: DbContext
    {
        public DESBContext (DbContextOptions options): base (options)
        {
        }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Administrador> Administradores { get; set; }
        public DbSet<Cliente> Clientes { get; set;}
        public DbSet<Descuento> Descuentos { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<DetalleDePedido> DetalleDePedidos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Descuento>()
            .HasOne<Cliente>()
            .WithMany()
            .HasForeignKey(p => p.IdPersona);

            modelBuilder.Entity<DetalleDePedido>()
            .HasOne<Pedido>()
            .WithMany()
            .HasForeignKey(p => p.CodPedido);
        }
    }
}
