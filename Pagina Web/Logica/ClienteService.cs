using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;

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
