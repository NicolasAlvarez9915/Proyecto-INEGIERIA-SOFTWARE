using System;
using Datos;
using DistribuidoraESB.Models;
using Entity;
using Logica;
using Microsoft.AspNetCore.Mvc;

namespace DistribuidoraESB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController: ControllerBase
    {
        private readonly UsuarioService service;
        public UsuarioController(DESBContext context)
        {
            service = new UsuarioService(context);
        }

        [HttpPost]
        public ActionResult<UsuarioViewModel> Post(UsuarioInputModel usuarioInput)
        {
            Usuario usuario = MapearUsuario(usuarioInput);
            var response = service.Guardar(usuario);
            if (response.Error) 
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.usuario);
        }
        
        [HttpGet]
        public ActionResult<UsuarioViewModel> Get(string correo, string contraseña)
        {
            Usuario usuario = new Usuario(){
                Correo = correo,
                Contraseña = contraseña,
            };
            var response = service.ValidarSesion(usuario);
            if (response.Error) 
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.usuario);
        }
        private Usuario MapearUsuario(UsuarioInputModel usuarioInput)
        {
            var usuario = new Usuario
            {
                Contraseña = usuarioInput.Contraseña,
                IdPersona = usuarioInput.IdPersona,
                Correo = usuarioInput.Correo,
                Rol = usuarioInput.Rol
            };
            return usuario;
        }
    }



    
}
