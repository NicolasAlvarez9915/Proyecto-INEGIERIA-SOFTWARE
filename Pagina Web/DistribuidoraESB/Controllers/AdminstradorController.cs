using System;
using Datos;
using DistribuidoraESB.Models;
using Entity;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DistribuidoraESB.Controllers
{
    [Authorize]
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
            var response = service.ValidarCrear(administradorInput.MapearEntrada());
            return StatusCode(response.CodigoHttp, response);
        }

        [HttpGet("{identificacion}")]
        public ActionResult<AdministradorViewModel> Get(string identificacion)
        {
            var response = service.Buscar(identificacion);
            return StatusCode(response.CodigoHttp, response);
        }

        [HttpPut("{campo}")]
        public ActionResult<String> Put(string campo, AdministradorInputModel administradorInput)
        {
            service.ActualizarInfo(administradorInput.MapearEntrada());
            return StatusCode(201, new Respuesta<string>("Correcto",false,201));
        }
        
    }
}
