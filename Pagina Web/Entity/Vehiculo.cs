using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Vehiculo
    {
        [Key]
        [Column(TypeName = "nvarchar(8)")]
        public string Placa { get; set; }
        [Column(TypeName = "nvarchar(11)")]
        [ForeignKey("Domiciliario")]
        public string IdDomiciliario { get; set; }
        [Column(TypeName = "Date")]
        public DateTime FechaSoat { get; set; }
        [Column(TypeName = "Date")]
        public DateTime FechaTecnoMecanica { get; set; }
    }
}
