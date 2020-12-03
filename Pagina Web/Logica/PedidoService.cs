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

        public List<Pedido> Pedidos()
        {
            return context.Pedidos.ToList();
        }

        public PedidoResponse buscarPedido(string codigo)
        {
            Pedido pedido = context.Pedidos.Where(s => s.Codigo == codigo).Include(s => s.DetallesDePedidos).FirstOrDefault();
            if(pedido == null){
                return new PedidoResponse("No encontrado");
            }
            return new PedidoResponse(pedido);
        } 
        
        public PedidoResponse Guardar(Pedido pedido)
        {
            try
            {
                pedido.Estado = "Bodega";
                context.Pedidos.Add(InicializarCodigos(pedido));
                context.SaveChanges();
                return new PedidoResponse(pedido);
            }
            catch (Exception e)
            {
                return new PedidoResponse($"Error de la aplicacion: {e.Message}");
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

        public Pedido GenerarPedido(List<Producto> Productos, Cliente Cliente){
            
            List<Descuento> Descuentos = context.Descuentos.Where(Descuentos => Descuentos.IdPersona == Cliente.Identificacion).ToList();
            List<DetalleDePedido> detalleDePedidos = GenerarDetallesPedido(Productos, Descuentos);
            Pedido pedido = CalcularPedido(detalleDePedidos);
            pedido.Fecha = DateTime.Parse(DateTime.Now.ToString("dd/MM/yyyy"));
            pedido.IdPersona = Cliente.Identificacion;
            return pedido;
        }

        public Pedido CalcularPedido(List<DetalleDePedido> detalleDePedidos)
        {
            Pedido pedido = new Pedido();
            pedido.SubTotal = detalleDePedidos.Sum(d => d.SubTotal);
            pedido.Iva = 19;
            pedido.TotalIva  =  pedido.SubTotal * (pedido.Iva/100);
            pedido.Descuento = detalleDePedidos.Sum(d => d.TotalDescuento);
            pedido.Total = pedido.SubTotal - pedido.Descuento + pedido.TotalIva;
            pedido.DetallesDePedidos = detalleDePedidos;
            return pedido;
        }

        public List<DetalleDePedido> GenerarDetallesPedido(List<Producto> Productos, List<Descuento> Descuentos){
            List<DetalleDePedido> detalleDePedidos = new List<DetalleDePedido>();

            foreach (Producto producto in Productos)
            {
                Descuento descuentoEncontrado = null;
                foreach (Descuento descuento in Descuentos)
                {
                    if(descuento.CodProducto == producto.Codigo)
                    {
                        descuentoEncontrado = descuento;
                        break;
                    }
                }
                detalleDePedidos.Add(CalcularDetalle(producto, descuentoEncontrado));
            }
            return detalleDePedidos;
        }

        public DetalleDePedido CalcularDetalle(Producto producto, Descuento descuento)
        {
            DetalleDePedido detalleDePedido = new DetalleDePedido();
            detalleDePedido.Descripcion = producto.Descripcion;
            detalleDePedido.CodProducto = producto.Codigo;
            detalleDePedido.Cantidad = producto.Cantidad;
            detalleDePedido.ValorUnitario = producto.Valor;

            if(descuento != null)
            {
                detalleDePedido.Descuento = descuento.Porcentaje;
            }else{
                detalleDePedido.Descuento = 0;
            }
            detalleDePedido.SubTotal = detalleDePedido.ValorUnitario * detalleDePedido.Cantidad;
            detalleDePedido.TotalDescuento = detalleDePedido.SubTotal * (detalleDePedido.Descuento/100);
            detalleDePedido.TotalConDescuento = detalleDePedido.SubTotal - detalleDePedido.TotalDescuento;
            detalleDePedido.total = detalleDePedido.SubTotal-detalleDePedido.TotalDescuento;
            detalleDePedido.Codigo = null;
            return detalleDePedido;
        }
    }

    public class PedidoResponse 
    {
        public PedidoResponse(Pedido pedido )
        {
            Error = false;
            this.pedido  = pedido;
        }
        public PedidoResponse(string mensaje)
        {
            Error = true;
            this.Mensaje = mensaje;
        }
        public string Mensaje { get; set; }
        public bool Error { get; set; }
        public Pedido pedido { get; set; }
    }
    
}
