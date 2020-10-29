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

    public class AdminstradorController: ControllerBase
    {
        private readonly AdministradorService service;
        
        public AdminstradorController(DESBContext context)
        {
            service = new AdministradorService(context);
        }

        [HttpPost]
        public ActionResult<AdministradorViewModel> Post(AdministradorInputModel administradorInput)
        {
            Administrador administrador = MapearAdministrador(administradorInput);
            var response = service.Guardar(administrador);
            return Ok(response.adminitrador);
        }

        [HttpGet("{identificacion}")]
        public ActionResult<AdministradorViewModel> Get(string identificacion)
        {
            var response = service.Buscar(identificacion);
            if(response.Error)
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.adminitrador);
        }
        private Administrador MapearAdministrador(AdministradorInputModel administradorInput)
        {
            var administrador = new Administrador
            {
                Identificacion = administradorInput.Identificacion,
                Nombres = administradorInput.Nombres,
                Apellidos = administradorInput.Apellidos,
                Telefono = administradorInput.Telefono,
                Whatsapp =administradorInput.Whatsapp,
                Puesto = administradorInput.Puesto
                
            };
            return administrador;
        }
    }
}
