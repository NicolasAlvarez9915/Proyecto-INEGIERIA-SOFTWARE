using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Entity
{
    public class Pedido
    {
        [Key]
        [Column(TypeName = "nvarchar(11)")]
        public string Codigo { get; set; }
        [Column(TypeName = "nvarchar(11)")]
        public string CodRuta { get; set; }
        [Column(TypeName = "nvarchar(11)")]
        public string IdPersona { get; set; }
        [Column(TypeName = "Date")]
        public DateTime Fecha { get; set; }
        [Column(TypeName = "real")]
        public double SubTotal { get; set; }
        [ForeignKey("CodPedido")]
        public List<DetalleDePedido> DetallesDePedidos { get; set; }
        [Column(TypeName = "int")]
        public double Iva { get; set; }
        [Column(TypeName = "real")]
        public double TotalIva { get; set; }
        [Column(TypeName = "real")]
        public double Total { get; set; }
        [Column(TypeName = "real")]
        public double Descuento { get; set; }
        [Column(TypeName = "nvarchar(11)")]
        public string Estado { get; set; }

        public Pedido()
        {
            
        }

        public Pedido(List<Producto> productos, List<Descuento> descuentos, Cliente cliente)
        {
            IdPersona = cliente.Identificacion;
            DetallesDePedidos = new();
            Fecha = DateTime.Parse(DateTime.Now.ToString("dd/MM/yyyy"));
            Iva = 19;
            AgregarDetallesDePedido(productos, descuentos);
        }

        public void AgregarDetallesDePedido(List<Producto> productos, List<Descuento> descuentos)
        {
            foreach (var producto in productos)
            {
                Descuento descuentoEncontrado = null;
                foreach (var descuento in descuentos)
                {
                    if (descuento.CodProducto == producto.Codigo)
                    {
                        descuentoEncontrado = descuento;
                        break;
                    }
                }
                DetalleDePedido detalleDePedido = new DetalleDePedido(producto, descuentoEncontrado);
                detalleDePedido.CodPedido = Codigo;
                DetallesDePedidos.Add(detalleDePedido);
            }
            CalcularTodo();
        }

        public void CalcularTodo()
        {
            SubTotal = DetallesDePedidos.Sum(d => d.SubTotal);
            TotalIva  =  SubTotal * (Iva/100);
            Descuento = DetallesDePedidos.Sum(d => d.TotalDescuento);
            Total = SubTotal - Descuento + TotalIva;
        }
    }
}
