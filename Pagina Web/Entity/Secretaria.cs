using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Secretaria: Persona
    {
        [Column(TypeName = "Date")]
        public DateTime FechaContratacion { get; set; }
    }
    
}
