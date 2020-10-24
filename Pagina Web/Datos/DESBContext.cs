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
    }
}
