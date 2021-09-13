using System;
using Entity;

namespace DistribuidoraESB.Models
{
    public class DescuentoInputModel
    {
        public string Codigo { get; set; }
        public int Porcentaje { get; set; }
        public string CodProducto { get; set; }
        public string NombreProducto { get; set; }
        public string IdPersona { get; set; }
        
        public Descuento MapearEntrada()
        {
            var descuento = new Descuento
            {
                Codigo = Codigo,
                Porcentaje = Porcentaje,
                CodProducto = CodProducto,
                IdPersona = IdPersona,
                NombreProducto = NombreProducto
            };
            return descuento;
        }
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
            NombreProducto = descuento.NombreProducto;
        }
    }
}
