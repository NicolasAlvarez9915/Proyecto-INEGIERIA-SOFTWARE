using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Domiciliario: Persona
    {
        [Column(TypeName = "Date")]
        public DateTime FechaPermisoConduccion { get; set; }
    }
}

