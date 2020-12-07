using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    }
}
