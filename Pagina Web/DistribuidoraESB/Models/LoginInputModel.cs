using System;
using System.Text.Json.Serialization;

namespace DistribuidoraESB.Models
{
    public class LoginInputModel
    {
        public string Correo { get; set; }
        public string Contraseña { get; set; }
    }
    public class LoginViewModel
    {
        public string IdPersona { get; set; }
        public string Rol { get; set; }
        public string Correo { get; set; }
        [JsonIgnore] //no se para que
        public string Password { get; set; }
         public string Token { get; set; }
    }
}
