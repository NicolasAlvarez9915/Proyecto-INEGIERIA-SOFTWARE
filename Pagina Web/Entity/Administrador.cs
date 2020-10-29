using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Administrador: Persona
    {
        [Column(TypeName = "nvarchar(50)")]
        public string Puesto { get; set; }
    }
}
