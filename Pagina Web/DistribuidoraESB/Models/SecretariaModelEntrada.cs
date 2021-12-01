using System;
using Entity;

namespace DistribuidoraESB.Models
{
    public class SecretariaModelEntrada: PersonaModel
    {
        public DateTime FechaContratacion { get; set; }
        
        public Secretaria MapearEntrada()
        {
            return new Secretaria
            {
                Identificacion = Identificacion,
                Nombres = Nombres,
                Apellidos = Apellidos,
                Telefono = ValidarNull(Telefono),
                Whatsapp = ValidarNull(Whatsapp),
                Estado =  Estado,
                TipoId = TipoId,
                FechaContratacion = FechaContratacion
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

    public class SecretariaModeloSalida: SecretariaModelEntrada
    {
        public SecretariaModeloSalida()
        {

        }
        public SecretariaModeloSalida(Secretaria secretaria)
        {
            TipoId = secretaria.TipoId;
            Identificacion = secretaria.Identificacion;
            Nombres = secretaria.Nombres;
            Apellidos = secretaria.Apellidos;
            Telefono = secretaria.Telefono;
            Whatsapp = secretaria.Whatsapp;
            Estado = secretaria.Estado;
            TipoId = secretaria.TipoId;
            FechaContratacion = secretaria.FechaContratacion;
        }
    }
}