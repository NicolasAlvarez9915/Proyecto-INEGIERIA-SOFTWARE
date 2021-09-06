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
                context.Clientes.Add(cliente);
                context.SaveChanges();
                return new Respuesta<Cliente>(cliente, 200);
            }
            catch (Exception e)
            {
                return new Respuesta<Cliente>($"Error de la aplicacion: {e.Message}",409);
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
                return new ($"Error al validar el crear: {e.Message}",409);
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

    }
}
