using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace Logica
{
    public class PedidoService
    {
        private readonly DESBContext context;

        public PedidoService(DESBContext context)
        {
            this.context = context;
        }

        public List<Pedido> SinRuta(){
            return context.Pedidos.Where(p => p.CodRuta == null && p.Estado == "Bodega").ToList();
        }

        public List<Pedido> PedidosEntregadosCliente(string Identificacion){
            List<Pedido> pedidos =context.Pedidos.Where(p => p.IdPersona == Identificacion && p.Estado == "Entregado" || p.Estado == "Pagado").ToList();
            return pedidos;
        }
        public List<Pedido> PedidosEnProcesoCliente(string Identificacion){
            return context.Pedidos.Where(p => p.IdPersona == Identificacion && p.Estado != "Entregado" && p.Estado != "Pagado").ToList();
        }
        public List<Pedido> Pedidos()
        {
            return context.Pedidos.ToList();
        }

        public Respuesta<Pedido> buscarPedido(string codigo)
        {
            Pedido pedido = context.Pedidos.Where(s => s.Codigo == codigo).Include(s => s.DetallesDePedidos).FirstOrDefault();
            if(pedido == null){
                return new ("No encontrado",201);
            }
            return new (pedido, 200);
        } 
        
        public Respuesta<Pedido> Guardar(Pedido pedido)
        {
            try
            {
                pedido.Estado = "Bodega";
                context.Pedidos.Add(InicializarCodigos(pedido));
                context.SaveChanges();
                return new (pedido, 201);
            }
            catch (Exception e)
            {
                return new ($"Error de la aplicacion. {e.Message}",500);
            }
        }
        
        

        public Pedido InicializarCodigos(Pedido pedido)
        {
            GenerarCodigoPedido(pedido);
            GenerarCodigosDetallesPedido(pedido);
            return pedido;
        }

        public Pedido GenerarCodigosDetallesPedido(Pedido pedido)
        {
            int cantidadPedidosRegistrados =  context.DetalleDePedidos.Count();
            bool Parar = true;
            while (Parar)
            {
                DetalleDePedido detalleDePedido = context.DetalleDePedidos.Find(cantidadPedidosRegistrados.ToString());
                if (detalleDePedido == null)
                {
                    Parar = false;
                    foreach (DetalleDePedido detalle in pedido.DetallesDePedidos)
                    {
                        detalle.Codigo = cantidadPedidosRegistrados.ToString();
                        detalle.CodPedido = pedido.Codigo;
                        cantidadPedidosRegistrados++;
                    }
                }
                cantidadPedidosRegistrados++;
            }
            return pedido;
        }

        public Pedido GenerarCodigoPedido(Pedido pedido)
        {
            int cantidadPedidosRegistrados =  context.Pedidos.Count();
            bool Parar = true;
            while (Parar)
            {
                Pedido pedidoEncontrado = context.Pedidos.Find(cantidadPedidosRegistrados.ToString());
                if (pedidoEncontrado == null)
                {
                    Parar = false;
                    pedido.Codigo = cantidadPedidosRegistrados.ToString();
                }
                cantidadPedidosRegistrados++;
            }
            return pedido;
        }

        public Respuesta<Pedido> GenerarPedido(List<Producto> Productos, Cliente Cliente){
            
            List<Descuento> Descuentos = context.Descuentos.Where(Descuentos => Descuentos.IdPersona == Cliente.Identificacion).ToList();
            Pedido pedido = new (Productos, Descuentos, Cliente);
            return new (pedido, 200);
        }

        public Respuesta<Pedido> ActualizarEstado(string Codigo, string Estado)
        {
            Pedido pedidoEncontrado = context.Pedidos.Find(Codigo);
            pedidoEncontrado.Estado = Estado;
            context.Pedidos.Update(pedidoEncontrado);
            context.SaveChanges();
            return new(pedidoEncontrado, 201);
        }
    }
}
