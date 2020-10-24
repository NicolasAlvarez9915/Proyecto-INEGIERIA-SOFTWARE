using System;
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

        public UsuarioResponse ValidarSesion(Usuario usuario)
        {
            var usuarioEncontrado = context.Usuarios.Find(usuario.Correo);
            if (usuarioEncontrado == null)
            {
                return new UsuarioResponse("Correo inexistente");
            }
            if (usuarioEncontrado.Contraseña != usuario.Contraseña)
            {
                return new UsuarioResponse("Contraseña incorrecta");
            }
            usuarioEncontrado.Contraseña = null;
            return new UsuarioResponse(usuarioEncontrado);
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
}
