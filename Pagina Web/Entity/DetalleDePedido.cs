using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class DetalleDePedido
    {
        [Column(TypeName = "nvarchar(11)")]
        public string CodPedido { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Descripcion { get; set;}
        [Key]
        [Column(TypeName = "nvarchar(11)")]
        public string Codigo { get; set; }
        [Column(TypeName = "nvarchar(11)")]
        public string CodProducto { get; set; }
        [Column(TypeName = "int")]
        public double Descuento { get; set; }
        [Column(TypeName = "real")]
        public double Cantidad { get; set; }
        [Column(TypeName = "real")]
        public double ValorUnitario { get; set; }
        [Column(TypeName = "real")]
        public double TotalDescuento { get; set; }
        [Column(TypeName = "real")]
        public double SubTotal { get; set; }
        [Column(TypeName = "real")]
        public double TotalConDescuento { get; set; }
        [Column(TypeName = "real")]
        public double total { get; set; }
    }
}
