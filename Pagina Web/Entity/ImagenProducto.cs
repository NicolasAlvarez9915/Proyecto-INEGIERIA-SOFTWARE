using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class ImagenProducto
    {
        [Key]
        [Column(TypeName = "nvarchar(11)")]
        public string CodProducto { get; set; }
        public byte[] Imagen { get; set; }
    }
}
