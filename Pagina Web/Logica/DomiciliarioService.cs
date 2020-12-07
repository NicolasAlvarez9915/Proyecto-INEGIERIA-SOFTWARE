using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;

namespace Logica
{
    public class DomiciliarioService
    {
        private readonly DESBContext context;

        public DomiciliarioService(DESBContext context)
        {
            this.context = context;
        }

        public DomiciliarioResponse Guardar(Domiciliario domiciliario, Vehiculo vehiculo)
        {
            try
            {
                context.Domiciliarios.Add(domiciliario);
                context.Vehiculos.Add(vehiculo);
                context.SaveChanges();
                return new DomiciliarioResponse(domiciliario);
            }
            catch (Exception e)
            {
                return new DomiciliarioResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public DomiciliarioResponse ValidarExistenciaDomicilio(string Identificacion)
        {
            Domiciliario domiciliario = context.Domiciliarios.Find(Identificacion);
            if( domiciliario == null)
            {
                return new DomiciliarioResponse("No existe");
            }
            return  new DomiciliarioResponse(domiciliario);
        }
        
        public VehiculoResponse ValidarExistenciaVehiculo(string Placa)
        {
            Vehiculo vehiculo = context.Vehiculos.Find(Placa);
            if( vehiculo == null)
            {
                return new VehiculoResponse("No existe");
            }
            return  new VehiculoResponse(vehiculo);
        }

        public VehiculoResponse BuscarVehiculo(string Identificacion)
        {
            List<Vehiculo> vehiculos = context.Vehiculos.Where(p => p.IdDomiciliario == Identificacion).ToList();
            if( vehiculos.Count == 0)
            {
                return new VehiculoResponse("No existe");
            }
            return  new VehiculoResponse(vehiculos[0]);
        }

        public List<Domiciliario> Todos()
        {
            return context.Domiciliarios.ToList();
        }
    }

    public class VehiculoResponse 
    {
        public VehiculoResponse(Vehiculo vehiculo)
        {
            Error = false;
            Vehiculo  = vehiculo;
        }
        public VehiculoResponse(string mensaje)
        {
            Error = true;
            this.Mensaje = mensaje;
        }
        public string Mensaje { get; set; }
        public bool Error { get; set; }
        public Vehiculo Vehiculo { get; set; }
    }
    
    public class DomiciliarioResponse 
    {
        public DomiciliarioResponse(Domiciliario domiciliario )
        {
            Error = false;
            this.Domiciliario  = domiciliario;
        }
        public DomiciliarioResponse(string mensaje)
        {
            Error = true;
            this.Mensaje = mensaje;
        }
        public string Mensaje { get; set; }
        public bool Error { get; set; }
        public Domiciliario Domiciliario { get; set; }
    }
    
}
