using System;
using Entity;

namespace DistribuidoraESB.Models
{
    public class AdministradorInputModel: PersonaModel
    {
        public string Puesto { get; set; }
        
        public Administrador MapearEntrada()
        {
            return new ()
            {
                Identificacion = Identificacion,
                Nombres = Nombres,
                Apellidos = Apellidos,
                Telefono = Telefono,
                Whatsapp = Whatsapp,
                Puesto = Puesto
                
            };
        }
    }

    public class AdministradorViewModel : AdministradorInputModel
    {
        public AdministradorViewModel()
        {

        }
        public AdministradorViewModel(Administrador administrador)
        {
            Identificacion = administrador.Identificacion;
            Nombres = administrador.Nombres;
            Apellidos = administrador.Apellidos;
            Telefono = administrador.Telefono;
            Whatsapp = administrador.Whatsapp;
            Puesto = administrador.Puesto;
        }
    }
}
