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
    public class ClienteController: ControllerBase
    {
        private readonly ClienteService service;

        public ClienteController(DESBContext context)
        {
            service = new ClienteService(context);
        }
        
        [AllowAnonymous]
        [HttpGet("{identificacion}")]
        public ActionResult<ClienteViewModel> Get(string identificacion)
        {
            var response = service.Buscar(identificacion);
            return StatusCode(response.CodigoHttp,response);
        }
        
        [AllowAnonymous]
        [HttpPost]
        public ActionResult<ClienteViewModel> Post(ClienteInputModel clienteInput)
        {
            
            var response = service.ValidarCrear(clienteInput.MapearCliente());
            return StatusCode(response.CodigoHttp,response);
        }

        [HttpPut]
        public ActionResult<String> Put(ClienteInputModel clienteInput)
        {
            service.ActualizarInfo(clienteInput.MapearCliente());
            return StatusCode(200,new Respuesta<string>("Correcto", false, 200));
        }

        [HttpGet]
        public IEnumerable<ClienteViewModel> Gets()
        {
            var clientes = service.Todos().Select(p => new ClienteViewModel(p));
            return clientes;
        }
    }
}
