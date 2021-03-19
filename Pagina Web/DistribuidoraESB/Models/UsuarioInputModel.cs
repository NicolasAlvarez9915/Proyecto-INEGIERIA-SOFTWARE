using System;
using Entity;

namespace DistribuidoraESB.Models
{
    public class UsuarioInputModel
    {
        public string Correo { get; set; }
        public string Contraseña { get; set; }
        public string Rol { get; set; }
        public string IdPersona { get; set; }
        
    }
    public class UsuarioViewModel : UsuarioInputModel
    {
        public UsuarioViewModel()
        {

        }
        public UsuarioViewModel(Usuario usuario)
        {
            Correo = usuario.Correo;
            Contraseña = usuario.Contraseña;
            Rol = usuario.Rol;
            IdPersona = usuario.IdPersona;
        }
    }
}
