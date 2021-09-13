using System;
using System.Collections.Generic;
using Entity;

namespace DistribuidoraESB.Models
{
    public class PedidoInputModel
    {
        public string Codigo { get; set; }
        public string IdPersona { get; set; }
        public DateTime Fecha { get; set; }
        public double SubTotal { get; set; }
        public List<DetalleDePedido> DetallesDePedidos { get; set; }
        public double Iva { get; set; }
        public double Total { get; set; }
        public double Descuento { get; set; }
        public double TotalIva { get; set; }
        public string Estado { get; set; }
        public string CodRuta { get; set; }
        
        

        public Pedido MapearPedido()
        {
            var pedido = new Pedido
            {
                Codigo = Codigo,
                Descuento = Descuento,
                DetallesDePedidos = DetallesDePedidos,
                Fecha = Fecha,
                IdPersona = IdPersona,
                Iva = Iva,
                SubTotal = SubTotal,
                Total = Total,
                TotalIva = TotalIva,
                Estado = Estado
            };
            return pedido;
        }
    }

    public class PedidoViewModel: PedidoInputModel
    {
        PedidoViewModel()
        {

        }
        public PedidoViewModel(Pedido pedido)
        {
            Codigo = pedido.Codigo;
            Fecha = pedido.Fecha;
            SubTotal = pedido.SubTotal;
            DetallesDePedidos = pedido.DetallesDePedidos;
            Iva = pedido.Iva;
            Total = pedido.Total;
            Descuento = pedido.Descuento;
            IdPersona = pedido.IdPersona;
            TotalIva = pedido.TotalIva;
            Estado = pedido.Estado;
            CodRuta = pedido.CodRuta;
        }
    }
}
