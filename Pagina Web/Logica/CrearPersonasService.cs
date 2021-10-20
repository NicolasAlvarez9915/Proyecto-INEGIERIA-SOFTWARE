using System;
using Datos;
using Entity;

namespace Logica
{
    public class CrearPersonasService
    {
        private readonly DESBContext context;

        public CrearPersonasService(DESBContext context)
        {
            this.context = context;
        }
        
        public Respuesta<Cliente> CrearCliente(Cliente cliente, Usuario usuario)
        {
            try
            {
                if (context.Clientes.Find(cliente.Identificacion) != null)
                {
                    return new ($"Cliente existente",409);    
                }

                if (context.Usuarios.Find(usuario.Correo) != null)
                {
                    return new ($"Usuario existente",409);
                }

                cliente.Estado = "Activo";
                usuario.Estado = "Activo";
                context.Clientes.Add(cliente);
                context.Usuarios.Add(usuario);
                context.SaveChanges();
                return new(cliente, 200);
            }
            catch (Exception e)
            {
                return new ($"Error de la aplicacion al crear Cliente: "+e.Message,500);
            }
        }
        
        public Respuesta<Domiciliario> CrearDomiciliario(Domiciliario domiciliario, Vehiculo vehiculo, Usuario usuario)
        {
            try
            {
                if (context.Domiciliarios.Find(domiciliario.Identificacion) != null)
                {
                    return new ($"Domiciliario existente",409);    
                }

                if (context.Vehiculos.Find(vehiculo.Placa) != null)
                {
                    return new ($"Vehiculo existente",409);
                }
                if (context.Usuarios.Find(usuario.Correo) != null)
                {
                    return new ($"Usuario existente",409);
                }

                domiciliario.Estado = "Activo";
                usuario.Estado = "Activo";
                context.Domiciliarios.Add(domiciliario);
                context.Vehiculos.Add(vehiculo);
                context.Usuarios.Add(usuario);
                context.SaveChanges();
                return new(domiciliario, 200);
            }
            catch (Exception e)
            {
                return new ($"Error de la aplicacion al crear domiciliario: "+e.Message,500);
            }
        }
    }
}