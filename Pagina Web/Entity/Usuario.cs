using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Usuario
    {
        [Key]
        [Column(TypeName = "nvarchar(50)")]
        public string Correo { get; set; }
        [Column(TypeName = "nvarchar(11)")]
        public string IdPersona { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Contraseña { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Rol { get; set; }
    }
}
