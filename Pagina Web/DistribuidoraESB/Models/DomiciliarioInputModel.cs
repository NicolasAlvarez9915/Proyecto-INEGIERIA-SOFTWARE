using System;
using Entity;

namespace DistribuidoraESB.Models
{
    public class DomiciliarioInputModel: PersonaModel
    {
        public DateTime FechaPermisoConduccion { get; set; }
        public Vehiculo Moto { get; set; }
        
        public Domiciliario MapearEntrada()
        {
            return new Domiciliario
            {
                Identificacion = Identificacion,
                Nombres = Nombres,
                Apellidos = Apellidos,
                Telefono = Telefono,
                Whatsapp = Whatsapp,
                FechaPermisoConduccion = FechaPermisoConduccion
            };
        }
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
            Estado = domiciliario.Estado;
        }
    }
}
