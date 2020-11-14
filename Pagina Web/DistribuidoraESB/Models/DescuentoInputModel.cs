using System;
using Entity;

namespace DistribuidoraESB.Models
{
    public class DescuentoInputModel
    {
        public string Codigo { get; set; }
        public int Porcentaje { get; set; }
        public string CodProducto { get; set; }
        public string IdPersona { get; set; }
    }

    public class DescuentoViewModel: DescuentoInputModel
    {
        public DescuentoViewModel()
        {

        }

        public DescuentoViewModel(Descuento descuento)
        {
            Codigo = descuento.Codigo;
            Porcentaje = descuento.Porcentaje;
            CodProducto = descuento.CodProducto;
            IdPersona = descuento.IdPersona;
        }
    }
}
