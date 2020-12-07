using System;
using System.Collections.Generic;
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
                AsigarPedidosAUnaRuta(ruta.Pedidos, false);
                ruta.Pedidos = null;
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

        public List<Ruta> Rutas()
        {
            return context.Rutas.ToList();
        }

        public void AsigarPedidosAUnaRuta(List<Pedido> pedidos, bool Guardar)
        {
            foreach (var pedido in pedidos)
            {
                Pedido pedidoEncontrado = context.Pedidos.Find(pedido.Codigo);
                pedidoEncontrado.CodRuta = pedido.CodRuta;
                context.Pedidos.Update(pedidoEncontrado);
                if (Guardar){
                    context.SaveChanges();
                }
            }
        }

        public void AsigarRutaAUnDomiciliario(Ruta ruta)
        {
            Ruta RutaEncontrada = context.Rutas.Find(ruta.Codigo);
            RutaEncontrada.CodDomiciliario = ruta.CodDomiciliario;
            context.Rutas.Update(RutaEncontrada);
            context.SaveChanges();
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
