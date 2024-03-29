using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;

namespace Logica
{
    public class DescuentoService
    {
        private readonly DESBContext context;

        public DescuentoService(DESBContext context)
        {
            this.context = context;
        }

        public Respuesta<Descuento> Guardar(List<Descuento> descuentos)
        {
            try
            {
                foreach (Descuento descuento in descuentos)
                {
                    context.Descuentos.Add(GenerarCodigo(descuento));
                    context.SaveChanges();
                }
                return new (descuentos[0],200);
            }
            catch (Exception e)
            {
                return new ($"Error de la aplicacion: {e.Message}",500);
            }
        }

        private Descuento GenerarCodigo(Descuento descuento)
        {
            var random = new Random();
            string codigo = random.Next().ToString();
            if (ValidarCodigo(codigo))
            {
                descuento.Codigo = codigo;
                return descuento;
            }
            GenerarCodigo(descuento);
            return null;
        }

        public bool ValidarCodigo(string codigo)
        {
            Descuento descuento = context.Descuentos.Find(codigo);

            if (descuento == null)
            {
                return true;
            }
            return false;
        }


        public List<Descuento> DescuentosCliente(string IdPersona)
        {
            return context.Descuentos.Where(Descuentos => Descuentos.IdPersona == IdPersona).ToList();
        }

        public List<Producto> ProductosSinDescuento(string IdPersona)
        {
            List<Descuento> DescuentosActuales = DescuentosCliente(IdPersona);
            List<Producto> Productos = context.Productos.ToList();
            List<Producto> ProductosSinDescuentos = new List<Producto>();
            bool ExisteDescuento = false;
            foreach (Producto producto in Productos)
            {
                ExisteDescuento = false;
                foreach (Descuento descuento in DescuentosActuales)
                {
                    if (producto.Codigo == descuento.CodProducto)
                    {
                        ExisteDescuento = true;
                        break;
                    }
                }
                if (!ExisteDescuento)
                {
                    ProductosSinDescuentos.Add(producto);
                }
            }
            return ProductosSinDescuentos;
        }
    }
}
