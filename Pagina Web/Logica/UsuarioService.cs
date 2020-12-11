using System;
using System.Linq;
using Datos;
using Entity;

namespace Logica
{
    public class UsuarioService
    {
        private readonly DESBContext context;

        public UsuarioService(DESBContext context)
        {
            this.context = context;
        }

        public UsuarioResponse Guardar(Usuario usuario)
        {
            try
            {
                context.Usuarios.Add(usuario);
                context.SaveChanges();
                return new UsuarioResponse(usuario);
            }
            catch (Exception e)
            {
                return new UsuarioResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public void actualizarContraseña(Usuario usuario)
        {
            Usuario usuarioActual =  context.Usuarios.Find(usuario.Correo);
            usuarioActual.Contraseña = usuario.Contraseña;
            context.Usuarios.Update(usuarioActual);
            context.SaveChanges();
        }

        public UsuarioResponse ValidarCorreo(string correo)
        {
            var usuarioEncontrado = context.Usuarios.Find(correo);
            if (usuarioEncontrado == null)
            {
                return new UsuarioResponse("Correo inexistente");
            }
            return new UsuarioResponse(usuarioEncontrado);
        }

        public Usuario Validate(string correo, string password) {
            return context.Usuarios.Where(u => u.Correo == correo && u.Contraseña == password).FirstOrDefault();
        }
        
    }
    public class UsuarioResponse 
        {
            public UsuarioResponse(Usuario usuario)
            {
                Error = false;
                this.usuario = usuario;
            }
            public UsuarioResponse(string mensaje)
            {
                Error = true;
                this.usuario = new Usuario
                {
                    Correo = mensaje,
                    Contraseña = mensaje,
                    Rol = mensaje,
                    IdPersona = mensaje
                };
                this.Mensaje = mensaje;
            }
            public string Mensaje { get; set; }
            public bool Error { get; set; }
            public Usuario usuario { get; set; }
        }
}
