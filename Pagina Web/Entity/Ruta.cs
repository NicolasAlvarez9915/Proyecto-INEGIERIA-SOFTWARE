using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Ruta
    {
        [Key]
        [Column(TypeName = "nvarchar(11)")]
        public string Codigo { get; set; }
        [Column(TypeName = "nvarchar(11)")]
        public string CodDomiciliario { get; set; }
        
        [ForeignKey("CodRuta")]
        public List<Pedido> Pedidos { get; set; }
    }
}
