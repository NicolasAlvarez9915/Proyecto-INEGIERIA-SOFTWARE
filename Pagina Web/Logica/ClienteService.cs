using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace Logica
{
    public class ClienteService
    {
        private readonly DESBContext context;

        public ClienteService(DESBContext context)
        {
            this.context = context;
        }

        public Respuesta<Cliente> Guardar(Cliente cliente)
        {
            try
            {
                cliente.Estado = "Activo";
                context.Clientes.Add(cliente);
                context.SaveChanges();
                return new Respuesta<Cliente>(cliente, 200);
            }
            catch (Exception e)
            {
                return new Respuesta<Cliente>($"Error de la aplicacion.",500);
            }
        }
        
        public Respuesta<Cliente> ValidarCrear(Cliente cliente)
        {
            try
            {
                Respuesta<Cliente> ClienteEncontrado = Buscar(cliente.Identificacion);
                return (ClienteEncontrado.Error)
                    ? Guardar(cliente) 
                    :  new("Cliente existente", 409);
            }
            catch (Exception e)
            {
                return new ($"Error al validar el crear: "+e.Message,500);
            }
        }
        
        public Respuesta<Cliente> Buscar(string Identificacion){
            Cliente cliente = context.Clientes.Find(Identificacion);
            return (cliente == null) ? new ("Cliente inexistente", 404)   : new (cliente, 200);
        }

        public List<Cliente> Todos()
        {
            List<Cliente> clientes  = context.Clientes.ToList();
            return clientes;
        }

        public void ActualizarInfo(Cliente cliente)
        {
            Cliente clienteEncontrado = context.Clientes.Find(cliente.Identificacion);
            if(clienteEncontrado.Nombres != cliente.Nombres)
            {
                clienteEncontrado.Nombres = cliente.Nombres;
            }
            if(clienteEncontrado.Apellidos != cliente.Apellidos)
            {
                clienteEncontrado.Apellidos = cliente.Apellidos;
            }
            if(clienteEncontrado.Telefono != cliente.Telefono)
            {
                clienteEncontrado.Telefono = cliente.Telefono;
            }
            if(clienteEncontrado.Whatsapp != cliente.Whatsapp)
            {
                clienteEncontrado.Whatsapp = cliente.Whatsapp;
            }
            if(clienteEncontrado.Direccion != cliente.Direccion)
            {
                clienteEncontrado.Direccion = cliente.Direccion;
            }
            if(clienteEncontrado.Horaio != cliente.Horaio)
            {
                clienteEncontrado.Apellidos = cliente.Apellidos;
            }
            context.Clientes.Update(clienteEncontrado);
            context.SaveChanges();
        }
        public Respuesta<Cliente> ValidarEliminarCliente(string id)
        {
            Pedido pedido = context.Pedidos.FirstOrDefault(x => x.IdPersona == id && x.Estado != "Entregado" && x.Estado != "Pagado");
            if (pedido != null)
            {
                return new("No se puede eliminar un cliente que tiene pedidos en proceso.",409);
            }
            return EliminarCliente(id);
        }
        public Respuesta<Cliente> EliminarCliente(string id)
        {
            Cliente cliente = context.Clientes.Find(id);
            cliente.Estado = "Inactivo";
            Usuario usuario = context.Usuarios.FirstOrDefault(x => x.IdPersona == id);
            usuario.Estado = "Inactivo";
            context.SaveChanges();
            return new(cliente, 200);
        }
    }
}
