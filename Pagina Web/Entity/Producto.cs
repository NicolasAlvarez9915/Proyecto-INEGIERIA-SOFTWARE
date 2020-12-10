using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Producto
    {
        [Key]
        [Column(TypeName = "nvarchar(11)")]
        public string Codigo { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Categoria { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Nombre { get; set; }
        [Column(TypeName = "real")]
        public double Cantidad { get; set; }
        [Column(TypeName = "real")]
        public double CantidadMinima { get; set; }
        [Column(TypeName = "int")]
        public int Valor { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Descripcion { get; set; }
    }
}
