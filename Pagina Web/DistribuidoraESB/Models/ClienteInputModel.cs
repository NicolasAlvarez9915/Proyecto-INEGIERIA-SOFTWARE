using System;
using System.Collections.Generic;
using Entity;

namespace DistribuidoraESB.Models
{
    public class ClienteInputModel: PersonaModel
    {
        public string Direccion { get; set; }
        public string Horaio { get; set; }
        public string TipoCliente { get; set; }
        public List<Descuento> Descuentos { get; set; }
        public Cliente MapearCliente()
        {
            return new Cliente
            {
                Identificacion = Identificacion,
                Nombres = Nombres,
                Apellidos = Apellidos,
                Telefono = ValidarNull(Telefono),
                Whatsapp = ValidarNull(Whatsapp),
                Direccion = ValidarNull(Direccion),
                Horaio = ValidarNull(Horaio),
                TipoCliente = ValidarNull(TipoCliente),
                Descuentos = Descuentos,
                Estado =  Estado
            };
        }

        
        private string ValidarNull(string texto)
        {
            if(texto == null)
            {
                return "No asignado";
            }
            return texto;
        }
    }

    public class ClienteViewModel: ClienteInputModel
    {
        public ClienteViewModel()
        {

        }
        public ClienteViewModel(Cliente cliente)
        {
            Identificacion = cliente.Identificacion;
            Nombres = cliente.Nombres;
            Apellidos = cliente.Apellidos;
            Telefono = cliente.Telefono;
            Whatsapp = cliente.Whatsapp;
            Direccion = cliente.Direccion;
            Horaio = cliente.Horaio;
            TipoCliente = cliente.TipoCliente;
            Descuentos = cliente.Descuentos;
            Estado = cliente.Estado;
        }
    }
}
