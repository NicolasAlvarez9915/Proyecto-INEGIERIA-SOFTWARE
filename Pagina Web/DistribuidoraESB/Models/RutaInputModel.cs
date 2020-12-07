using System;
using System.Collections.Generic;
using Entity;

namespace DistribuidoraESB.Models
{
    public class RutaInputModel
    {
        public string Codigo { get; set; }
        public string CodDomiciliario { get; set; }
        public List<Pedido> Pedidos { get; set; }
    }

    public class RutaViewModel: RutaInputModel
    {
        public RutaViewModel()
        {

        }

        public RutaViewModel(Ruta ruta)
        {
            Codigo = ruta.Codigo;
            CodDomiciliario = ruta.CodDomiciliario;
            Pedidos = ruta.Pedidos;
        }

    }
}
