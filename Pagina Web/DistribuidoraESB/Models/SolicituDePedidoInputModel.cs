using System;
using System.Collections.Generic;

namespace DistribuidoraESB.Models
{
    public class SolicituDePedidoInputModel
    {
        public List<ProductoInputModel> productos { get; set; }
        public ClienteInputModel Cliente { get; set; }
        public DateTime Fecha { get; set; }
    }
}
