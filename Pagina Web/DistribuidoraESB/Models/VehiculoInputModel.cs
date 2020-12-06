using System;
using Entity;

namespace DistribuidoraESB.Models
{
    public class VehiculoInputModel
    {
        public string Placa { get; set; }
        public string IdDomiciliario { get; set; }
        public DateTime FechaSoat { get; set; }
        public DateTime FechaTecnoMecanica { get; set; }
    }

    public class VehiculoViewModel: VehiculoInputModel
    {
        VehiculoViewModel()
        {

        }
        public VehiculoViewModel(Vehiculo vehiculo)
        {
            Placa = vehiculo.Placa;
            IdDomiciliario = vehiculo.IdDomiciliario;
            FechaSoat = vehiculo.FechaSoat;
            FechaTecnoMecanica = vehiculo.FechaTecnoMecanica;
        }
    }
}
