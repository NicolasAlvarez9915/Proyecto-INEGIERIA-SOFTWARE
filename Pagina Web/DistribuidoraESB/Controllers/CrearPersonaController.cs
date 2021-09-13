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
    public class CrearPersonaController: ControllerBase
    {
        private readonly CrearPersonasService service;
        public CrearPersonaController(DESBContext context)
        {
            service = new (context);
        }

        [HttpPost]
        public ActionResult<Respuesta<Domiciliario>> CrearDomiciliario(CrearDomiciliarioModeloEntrada domiciliarioInputModel)
        {
            var responde = service.CrearDomiciliario(domiciliarioInputModel.Domiciliario.MapearEntrada(),
                domiciliarioInputModel.Domiciliario.Moto, domiciliarioInputModel.Usuario);
            return StatusCode(responde.CodigoHttp, responde);
        }
        
        [AllowAnonymous]
        [HttpPost("Cliente")]
        public ActionResult<Respuesta<Cliente>> CrearCliente(CrearClienteModeloEntrada clienteModeloEntrada)
        {
            var responde = service.CrearCliente(clienteModeloEntrada.cliente.MapearCliente(), clienteModeloEntrada.usuario.MapearEntrada());
            return StatusCode(responde.CodigoHttp, responde);
        }
    }
}