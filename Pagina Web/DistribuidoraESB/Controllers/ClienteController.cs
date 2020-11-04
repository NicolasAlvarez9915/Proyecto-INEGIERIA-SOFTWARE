using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using DistribuidoraESB.Models;
using Entity;
using Logica;
using Microsoft.AspNetCore.Mvc;

namespace DistribuidoraESB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClienteController: ControllerBase
    {
        private readonly ClienteService service;

        public ClienteController(DESBContext context)
        {
            service = new ClienteService(context);
        }

        [HttpGet("{identificacion}")]
        public ActionResult<ClienteViewModel> Get(string identificacion)
        {
            var response = service.Buscar(identificacion);
            if(response.Error)
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.cliente);
        }

        [HttpPost]
        public ActionResult<ClienteViewModel> post(ClienteInputModel clienteInput)
        {
            Cliente cliente = MapearCliente(clienteInput);
            var response = service.Guardar(cliente);
            return Ok(response.cliente);
        }

        [HttpPut("{tipoInformacion}")]
        public ActionResult<String> Put(string tipoInformacion, ClienteInputModel clienteInput)
        {
            Cliente cliente = MapearCliente(clienteInput);

            if(tipoInformacion == "Personal")
            {
                service.ActualizarInfoPersonal(cliente);
            }else{
                service.ActualizarInfoDomicilio(cliente);
            }
            return Ok("Correcto");
        }

        [HttpGet]
        public IEnumerable<ClienteViewModel> Gets()
        {
            var clientes = service.Todos().Select(p => new ClienteViewModel(p));
            return clientes;
        }

        private Cliente MapearCliente(ClienteInputModel clienteInput)
        {
            var cliente = new Cliente
            {
                Identificacion = clienteInput.Identificacion,
                Nombres = clienteInput.Nombres,
                Apellidos = clienteInput.Apellidos,
                Telefono = clienteInput.Telefono,
                Whatsapp = clienteInput.Whatsapp,
                Direccion = clienteInput.Direccion,
                Horaio = clienteInput.Horaio
            };
            return cliente;
        }
    }
}
