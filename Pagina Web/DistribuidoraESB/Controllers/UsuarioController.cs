using System;
using Datos;
using DistribuidoraESB.Config;
using DistribuidoraESB.Models;
using DistribuidoraESB.Service;
using Entity;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DistribuidoraESB.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService service;
        private readonly JwtService _jwtService;
        private readonly DESBContext Context;
        public UsuarioController(DESBContext context, IOptions<AppSetting> appSetting)
        {
            Context = context;
            var admin = Context.Usuarios.Find("admin@admin.com");
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
                
                Context.SaveChanges();
            }
            service = new UsuarioService(context);
            _jwtService = new JwtService(appSetting);
        }

        [AllowAnonymous]
        [HttpPost("InicioSesion")]
        public IActionResult Login(LoginInputModel model)
        {
            var user = service.Validate(model.Correo, model.Contraseña);
            if (user == null) return BadRequest("Username or password is incorrect");
            var response = _jwtService.GenerateToken(user);
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<UsuarioViewModel> Post(UsuarioInputModel usuarioInput)
        {
            Usuario usuario = MapearUsuario(usuarioInput);
            var response = service.Guardar(usuario);
            return Ok(response.usuario);
        }

        [HttpPut("{campo}")]
        public ActionResult<String> Put(string campo, UsuarioInputModel usuarioInput)
        {
            service.actualizarContraseña(MapearUsuario(usuarioInput));
            return Ok("Correcto");
        }
        [AllowAnonymous]
        [HttpGet("{correo}")]
        public ActionResult<UsuarioViewModel> Get(string correo)
        {
            var response = service.ValidarCorreo(correo);
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
