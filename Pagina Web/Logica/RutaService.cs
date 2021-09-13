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

        public Respuesta<Ruta> Guardar(Ruta ruta)
        {
            try
            {
                Ruta rutas = context.Rutas.FirstOrDefault(p => p.CodDomiciliario == ruta.CodDomiciliario);
                if (rutas == null)
                {
                    ruta = GenerarCodigo(ruta);
                    List<Pedido> pedidos = ruta.Pedidos;
                    ruta.Pedidos = null;
                    context.Rutas.Add(ruta);
                    ruta.Pedidos = pedidos;
                }else{
                    ruta.Codigo = rutas.Codigo;
                }
                
                AsigarPedidosAUnaRuta(ruta, false);
                ruta.Pedidos = null;
                context.SaveChanges();
                return new (ruta, 200);
            }
            catch (Exception e)
            {
                return new ($"Error de la aplicacion: {e.Message}", 500);
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
                    break;
                }
                codigoGenerico++;
            }
            ruta.Codigo = codigoGenerico.ToString();
            return ruta;
        }
        public Respuesta<Ruta> BuscarRuta(string Codigo)
        {
            Ruta ruta  = context.Rutas.Where(s => s.CodDomiciliario == Codigo).Include(s => s.Pedidos).FirstOrDefault();
            if(ruta == null)
            {
                return new ("No existe", 404);
            }
            return new (ruta, 200);
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
    
}
