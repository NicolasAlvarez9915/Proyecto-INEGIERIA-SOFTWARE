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

        public DescuentoResponse Guardar(Descuento descuento)
        {
            try
            {
                context.Descuentos.Add(descuento);
                context.SaveChanges();
                return new DescuentoResponse(descuento);
            }
            catch (Exception e)
            {
                return new DescuentoResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public List<Descuento> DescuentosCliente(string IdPersona)
        {
            return context.Descuentos.Where(Descuentos => Descuentos.IdPersona == IdPersona).ToList();
        }
    }
    public class DescuentoResponse
    {
        public DescuentoResponse(Descuento descuento)
        {
            Error = false;
            this.descuento = descuento;
        }
        public DescuentoResponse(string mensaje)
        {
            Error = true;
            this.Mensaje = mensaje;
        }
        public string Mensaje { get; set; }
        public bool Error { get; set; }
        public Descuento descuento { get; set; }
    }
}
