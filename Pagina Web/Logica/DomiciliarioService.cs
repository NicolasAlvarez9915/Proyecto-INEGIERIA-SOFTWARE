using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace Logica
{
    public class DomiciliarioService
    {
        private readonly DESBContext context;

        public DomiciliarioService(DESBContext context)
        {
            this.context = context;
        }

        public Respuesta<Domiciliario> Guardar(Domiciliario domiciliario, Vehiculo vehiculo)
        {
            try
            {
                domiciliario.Estado = "Activo";
                context.Domiciliarios.Add(domiciliario);
                context.Vehiculos.Add(vehiculo);
                context.SaveChanges();
                return new (domiciliario, 200);
            }
            catch (Exception e)
            {
                return new ($"Error de la aplicacion: {e.Message}", 500);
            }
        }

        public Respuesta<Domiciliario> ValidarExistenciaDomicilio(string Identificacion)
        {
            Domiciliario domiciliario = context.Domiciliarios.Find(Identificacion);
            return domiciliario == null ? new ("Domiciliario inexistente", 404) : new (domiciliario, 200);
        }
        
        public Respuesta<Vehiculo> ValidarExistenciaVehiculo(string Placa)
        {
            Vehiculo vehiculo = context.Vehiculos.Find(Placa);
            return vehiculo == null ? new("Vehiculo inexistente", 404) :  new (vehiculo, 200);
        }

        public Respuesta<Vehiculo> BuscarVehiculo(string Identificacion)
        {
            List<Vehiculo> vehiculos = context.Vehiculos.Where(p => p.IdDomiciliario == Identificacion).ToList();
            return vehiculos.Count == 0 ? new("Vehiculo inexistente", 404) : new (vehiculos[0],200);
        }

        public List<Domiciliario> Todos()
        {
            return context.Domiciliarios.ToList();
        }

        public List<Domiciliario> DomiciliariosSinRuta()
        {
            List<Domiciliario> domiciliarios = Todos().Where(d => d.Estado == "Activo").ToList();
            List<Ruta> rutas = context.Rutas.ToList();
            List<Domiciliario> domiciliariosSinRuta = new List<Domiciliario>();
            foreach (Domiciliario domiciliario in domiciliarios)
            {
                if(!rutas.Any(c => c.CodDomiciliario == domiciliario.Identificacion))
                {
                    domiciliariosSinRuta.Add(domiciliario);
                }else if (domiciliarioConMenosDeTresPedidos(rutas.Where(r => r.CodDomiciliario == domiciliario.Identificacion ).ToList())){
                    domiciliariosSinRuta.Add(domiciliario);
                }
            }
            return domiciliariosSinRuta;
        }

        public bool domiciliarioConMenosDeTresPedidos(List<Ruta> rutas){
            List<Pedido> pedidos = context.Pedidos.Where(p => p.CodRuta == rutas[0].Codigo && p.Estado != "Entregado").ToList();
            return pedidos.Count <= 3;
        }
        
        public Respuesta<Domiciliario> ValidarEliminarDomiciliario(string id)
        {
            
            Ruta ruta = context.Rutas.Where(x => x.CodDomiciliario == id).Include(s => s.Pedidos).FirstOrDefault();
            if (ruta == null)
            {
                   return new(EliminarDomiciliario(id), 200);
            }
            foreach (var iterador in ruta.Pedidos)
            {
                if (iterador.Estado == "En camino")
                {
                    return new("No se puede eliminar el domiciliario, tiene pedidos que estan en camino", 409);
                }
                else
                {
                    iterador.CodRuta = null;
                }
            }
            context.Rutas.Remove(ruta);
            return new(EliminarDomiciliario(id), 200);
        }

        private Domiciliario EliminarDomiciliario(string id)
        {
            Domiciliario domiciliario = context.Domiciliarios.Find(id);
            domiciliario.Estado = "Inactivo";
            Usuario usuario = context.Usuarios.FirstOrDefault(x => x.IdPersona == id);
            usuario.Estado = "Inactivo";
            context.SaveChanges();
            return domiciliario;
        }
    }
    
}
