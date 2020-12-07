using System;
using System.Linq;
using Datos;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace Logica
{
    public class RutaService
    {
        private readonly DESBContext context;

        public RutaService(DESBContext context)
        {
            this.context = context;
        }

        public RutaResponse Guardar(Ruta ruta)
        {
            try
            {
                context.Rutas.Add(ruta);
                context.SaveChanges();
                return new RutaResponse(ruta);
            }
            catch (Exception e)
            {
                return new RutaResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public RutaResponse BuscarRuta(string Codigo)
        {
            Ruta ruta  = context.Rutas.Where(s => s.Codigo == Codigo).Include(s => s.Pedidos).FirstOrDefault();
            if(ruta == null)
            {
                return new RutaResponse("No existe");
            }
            return new RutaResponse(ruta);
        }
    }

    public class RutaResponse 
    {
        public RutaResponse(Ruta ruta )
        {
            Error = false;
            this.ruta  = ruta;
        }
        public RutaResponse(string mensaje)
        {
            Error = true;
            this.Mensaje = mensaje;
        }
        public string Mensaje { get; set; }
        public bool Error { get; set; }
        public Ruta ruta { get; set; }
    }
    
}
