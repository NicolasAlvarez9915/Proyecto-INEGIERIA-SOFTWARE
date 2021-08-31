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

        public void validarUsuarioPorDefecto()
        {
            var admin = context.Usuarios.Find("admin@admin.com");
            if (admin == null)
            {
                context.Administradores.Add(new Administrador()
                    {
                        Apellidos = "Alvarez",
                        Identificacion = "1120754742",
                        Nombres = "Nicolas",
                        Puesto = "Gerente",
                        Telefono = "3017120334",
                        Whatsapp = "+573017120334"
                    }
                );
                context.Usuarios.Add(new Usuario()
                    {
                        Correo = "admin@admin.com",
                        Contraseña = "123",
                        IdPersona = "1120754742",
                        Rol = "Administrador"
                    }
                );
                context.SaveChanges();
            }
        } 

        public Respuesta<Usuario> Guardar(Usuario usuario)
        {
            try
            {
                context.Usuarios.Add(usuario);
                context.SaveChanges();
                return new (usuario, 200);
            }
            catch (Exception e)
            {
                return new ($"Error de la aplicacion: {e.Message}", 409);
            }
        }

        public Respuesta<Usuario> actualizarContraseña(Usuario usuario)
        {
            Usuario usuarioActual =  context.Usuarios.Find(usuario.Correo);
            if (usuarioActual == null) return new("Usuario inexistente.", 404);
            usuarioActual.Contraseña = usuario.Contraseña;
            context.Usuarios.Update(usuarioActual);
            context.SaveChanges();
            return new(usuarioActual, 201);
        }

        public Respuesta<Usuario> ValidarCorreo(string correo)
        {
            var usuarioEncontrado = context.Usuarios.Find(correo);
            if (usuarioEncontrado == null)
            {
                return new ("Correo inexistente", 404);
            }
            return new (usuarioEncontrado, 200);
        }

        public Respuesta<Usuario> Validate(string correo, string password) {
            Usuario usuario =  context.Usuarios.Where(u => u.Correo == correo).FirstOrDefault();
            return (usuario == null) ? new("Usuario inexistente.", 404) :
                (usuario.Contraseña != password) ? new("Contraseña incorrecta.", 409) : 
                new(usuario, 201);
        }
        
    }
}
