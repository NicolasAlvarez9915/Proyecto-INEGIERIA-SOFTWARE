using System;
using Entity;

namespace DistribuidoraESB.Models
{
    public class DetalleDePedidoInputModel
    {
        public string CodPedido { get; set; }
        public string Descripcion { get; set;}
        public string Codigo { get; set; }
        public string CodProducto { get; set; }
        public double Descuento { get; set; }
        public double Cantidad { get; set; }
        public double ValorUnitario { get; set; }
        public double TotalDescuento { get; set; }
        public double SubTotal { get; set; }
        public double TotalConDescuento { get; set; }
        public double total { get; set; }
    }

    public class DetalleDePedidoViewModel: DetalleDePedidoInputModel
    {
        DetalleDePedidoViewModel()
        {

        }
        public DetalleDePedidoViewModel(DetalleDePedido detalleDePedido)
        {
            CodPedido = detalleDePedido.CodPedido;
            Descripcion = detalleDePedido.Descripcion;
            Codigo = detalleDePedido.Codigo;
            CodProducto = detalleDePedido.CodProducto;
            Descuento = detalleDePedido.Descuento;
            Cantidad = detalleDePedido.Cantidad;
            ValorUnitario = detalleDePedido.ValorUnitario;
            TotalDescuento = detalleDePedido.TotalDescuento;
            total = detalleDePedido.total;
            SubTotal = detalleDePedido.SubTotal;
        }
    }
}
