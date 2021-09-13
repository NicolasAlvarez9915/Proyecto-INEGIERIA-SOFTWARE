using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using DistribuidoraESB.Models;
using Entity;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DistribuidoraESB.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RutaController: ControllerBase
    {
        private readonly RutaService service;
        public RutaController(DESBContext context)
        {
            service = new RutaService(context);
        }

        [HttpPost]
        public ActionResult<RutaViewModel> Post(RutaInputModel rutaInput)
        {
            var response = service.Guardar(rutaInput.MapearRuta());
            return StatusCode(response.CodigoHttp, response);
        }

        [HttpGet]
        public IEnumerable<RutaViewModel> Get()
        {
            return service.Rutas().Select(p => new RutaViewModel(p));
        }

        [HttpGet("{Identificacion}")]
        public ActionResult<RutaViewModel> Get(string Identificacion)
        {
            var response = service.BuscarRuta(Identificacion);
            return StatusCode(response.CodigoHttp, response);
        }
    }
}
