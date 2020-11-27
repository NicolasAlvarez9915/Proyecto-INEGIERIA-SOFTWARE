using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;

namespace Logica
{
    public class PedidoService
    {
        private readonly DESBContext context;

        public PedidoService(DESBContext context)
        {
            this.context = context;
        }

        public Pedido GenerarPedido(List<Producto> Productos, Cliente Cliente, DateTime Fecha){
            
            List<Descuento> Descuentos = context.Descuentos.Where(Descuentos => Descuentos.IdPersona == Cliente.Identificacion).ToList();
            List<DetalleDePedido> detalleDePedidos = GenerarDetallesPedido(Productos, Descuentos);
            Pedido pedido = CalcularPedido(detalleDePedidos);
            pedido.Fecha = Fecha;
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
            detalleDePedido.TotalConDescuento = detalleDePedido.SubTotal - detalleDePedido.TotalConDescuento;
            detalleDePedido.total = detalleDePedido.SubTotal-detalleDePedido.TotalDescuento;
            detalleDePedido.Codigo = null;
            return detalleDePedido;
        }
    }
}
