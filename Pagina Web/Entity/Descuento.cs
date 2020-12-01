using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Descuento
    {
        [Key]
        [Column(TypeName = "nvarchar(11)")]
        public string Codigo { get; set; }
        [Column(TypeName = "real")]
        public int Porcentaje { get; set; }
        [Column(TypeName = "nvarchar(11)")]
        public string CodProducto { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string NombreProducto { get; set; }
        [Column(TypeName = "nvarchar(11)")]
        public string IdPersona { get; set; }
    }
}
