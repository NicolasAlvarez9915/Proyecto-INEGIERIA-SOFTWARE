using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public abstract class Persona
    {
        [Key]
        [Column(TypeName = "nvarchar(11)")]
        public string Identificacion { get; set; }
        [Column(TypeName = "nvarchar(5)")]
        public string TipoId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Nombres { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Apellidos { get; set; }
        [Column(TypeName = "nvarchar(15)")]
        public string Telefono { get; set; }
        [Column(TypeName = "nvarchar(15)")]
        public string Whatsapp { get; set; }

        public String Estado { get; set; }
    }
}
