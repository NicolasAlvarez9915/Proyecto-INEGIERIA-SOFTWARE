using System;
using Entity;

namespace DistribuidoraESB.Models
{
    public class DomiciliarioInputModel: PersonaModel
    {
        public DateTime FechaPermisoConduccion { get; set; }
        public Vehiculo Moto { get; set; }
    }

    public class DomiciliarioViewModel: DomiciliarioInputModel
    {
        DomiciliarioViewModel()
        {

        }
        public DomiciliarioViewModel(Domiciliario domiciliario)
        {
            Identificacion = domiciliario.Identificacion;
            Nombres = domiciliario.Nombres;
            Apellidos = domiciliario.Apellidos;
            Telefono = domiciliario.Telefono;
            Whatsapp = domiciliario.Whatsapp;
            FechaPermisoConduccion = domiciliario.FechaPermisoConduccion;
            Moto = domiciliario.Moto;
        }
    }
}
