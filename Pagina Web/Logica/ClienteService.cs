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

        public ClienteResponse Guardar(Cliente cliente)
        {
            try
            {
                context.Clientes.Add(cliente);
                context.SaveChanges();
                return new ClienteResponse(cliente);
            }
            catch (Exception e)
            {
                return new ClienteResponse($"Error de la aplicacion: {e.Message}");
            }
        }
        
        public ClienteResponse Buscar(string Identificacion){
            Cliente cliente = context.Clientes.Find(Identificacion);
            return new ClienteResponse(cliente);
        }

        public List<Cliente> Todos()
        {
            List<Cliente> clientes  = context.Clientes.ToList();
            return clientes;
        }

        public void ActualizarInfoPersonal(Cliente cliente)
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
            context.Clientes.Update(clienteEncontrado);
            context.SaveChanges();
        }

        public void ActualizarInfoDomicilio(Cliente cliente)
        {
            Cliente clienteEncontrado = context.Clientes.Find(cliente.Identificacion);
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
    public class ClienteResponse 
    {
        public ClienteResponse(Cliente cliente)
        {
            Error = false;
            this.cliente  = cliente;
        }
        public ClienteResponse(string mensaje)
        {
            Error = true;
            this.Mensaje = mensaje;
        }
        public string Mensaje { get; set; }
        public bool Error { get; set; }
        public Cliente cliente { get; set; }
    }
}
