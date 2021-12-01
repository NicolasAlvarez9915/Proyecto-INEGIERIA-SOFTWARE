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
    [Route("api/[controller]")]
    [ApiController]
    public class SecretariaController: ControllerBase
    {
        private readonly SecretariaService service;

        public SecretariaController(DESBContext context)
        {
            service = new SecretariaService(context);
        }
        
        [HttpGet("Secretario/{identificacion}")]
        public ActionResult<Respuesta<Secretaria>> GetDomiciliario(string identificacion)
        {
            var response = service.Buscar(identificacion);
            return StatusCode(response.CodigoHttp, response);
        }
        
        [HttpGet("Todos")]
        public IEnumerable<SecretariaModeloSalida> Get()
        {
            return service.Todos().Select(p => new SecretariaModeloSalida(p));
        }
    }
}