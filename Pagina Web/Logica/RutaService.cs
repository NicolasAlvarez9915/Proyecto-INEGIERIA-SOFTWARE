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
                List<Ruta> rutas = context.Rutas.Where(p => p.CodDomiciliario == ruta.CodDomiciliario).ToList();
                if (rutas.Count == 0)
                {
                    ruta = GenerarCodigo(ruta);
                    context.Rutas.Add(ruta);
                }else{
                    ruta.Codigo = rutas[0].Codigo;
                }
                AsigarPedidosAUnaRuta(ruta, false);
                ruta.Pedidos = null;
                context.SaveChanges();
                return new RutaResponse(ruta);
            }
            catch (Exception e)
            {
                return new RutaResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public Ruta GenerarCodigo(Ruta ruta)
        {
            int  codigoGenerico = context.Rutas.Count();
            foreach (Ruta rutaIterador in context.Rutas.ToList())
            {
                Ruta rutaEncontrada = context.Rutas.Find(codigoGenerico.ToString());
                if(rutaEncontrada == null)
                {
                    ruta.Codigo = codigoGenerico.ToString();
                    return ruta;
                }
                codigoGenerico++;
            }
            return null;
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

        public void AsigarPedidosAUnaRuta(Ruta ruta, bool Guardar)
        {
            foreach (var pedido in ruta.Pedidos)
            {
                Pedido pedidoEncontrado = context.Pedidos.Find(pedido.Codigo);
                pedidoEncontrado.CodRuta = ruta.Codigo;
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
