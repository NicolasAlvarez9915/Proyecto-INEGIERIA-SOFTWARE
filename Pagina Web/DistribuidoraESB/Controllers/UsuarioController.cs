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
        public UsuarioController(DESBContext context, IOptions<AppSetting> appSetting)
        {
            service = new UsuarioService(context);
            service.ValidarUsuarioPorDefecto();
            _jwtService = new JwtService(appSetting);
        }
        [AllowAnonymous]
        [HttpPost("InicioSesion")]
        public IActionResult Login(LoginInputModel model)
        {
            var response = service.Validate(model.Correo, model.Contraseña);
            return (response.Error)
                ? StatusCode(response.CodigoHttp, response)
                : StatusCode(response.CodigoHttp,
                    new Respuesta<LoginViewModel>(_jwtService.GenerateToken(response.Objeto), response.CodigoHttp));
        }
        [AllowAnonymous]
        [HttpPost]
        public ActionResult<UsuarioViewModel> Post(UsuarioInputModel usuarioInput)
        {
            var response = service.Guardar(usuarioInput.MapearEntrada());
            return StatusCode(response.CodigoHttp, response);
        }

        [HttpPut("{campo}")]
        public ActionResult<String> Put(string campo, UsuarioInputModel usuarioInput)
        {
            var response = service.ActualizarContraseña(usuarioInput.MapearEntrada());
            return StatusCode(response.CodigoHttp, response);
        }
        [AllowAnonymous]
        [HttpGet("{correo}")]
        public ActionResult<UsuarioViewModel> Get(string correo)
        {
            var response = service.ValidarCorreo(correo);
            return StatusCode(response.CodigoHttp, response);
        }
        
    }
}
