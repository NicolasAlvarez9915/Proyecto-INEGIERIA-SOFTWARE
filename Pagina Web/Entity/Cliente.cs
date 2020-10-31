using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Cliente: Persona
    {
        [Column(TypeName = "nvarchar(100)")]
        public string Direccion { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Horaio { get; set; }
    }
}