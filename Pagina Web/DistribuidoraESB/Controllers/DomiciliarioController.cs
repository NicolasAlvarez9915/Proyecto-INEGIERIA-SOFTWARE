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
    [Route("api/[controller]")]
    [ApiController]
    public class DomiciliarioController: ControllerBase
    {
        private readonly DomiciliarioService service;

        public DomiciliarioController(DESBContext context)
        {
            service = new DomiciliarioService(context);
        }
        
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(String id)
        {
            var response = service.ValidarEliminarDomiciliario(id);
            return StatusCode(response.CodigoHttp, response);
        }

        [HttpPost]
        public ActionResult<DomiciliarioViewModel> post(DomiciliarioInputModel domiciliarioInput)
        {
            var response = service.Guardar(domiciliarioInput.MapearEntrada(), domiciliarioInput.Moto);
            return StatusCode(response.CodigoHttp,response);
        }

        [HttpGet("Domiciliario/{identificacion}")]
        public ActionResult<DomiciliarioViewModel> GetDomiciliario(string identificacion)
        {
            var response = service.ValidarExistenciaDomicilio(identificacion);
            return StatusCode(response.CodigoHttp, response);
        }

        [HttpGet("Vehiculo/{Placa}")]
        public ActionResult<VehiculoViewModel> GetVehiculo(string Placa)
        {
            var response = service.ValidarExistenciaVehiculo(Placa);
            return StatusCode(response.CodigoHttp, response);
        }

        [HttpGet("BuscarVehiculo/{Identificacion}")]
        public ActionResult<VehiculoViewModel> GetBuscarVehiculo(string Identificacion)
        {
            var response = service.BuscarVehiculo(Identificacion);
            return StatusCode(response.CodigoHttp, response);
        }

        [HttpGet]
        public IEnumerable<DomiciliarioViewModel> Get()
        {
            return service.Todos().Select(p => new DomiciliarioViewModel(p));
        }

        [HttpGet("SinRuta")]
        public IEnumerable<DomiciliarioViewModel> GetSinRuta()
        {
            return service.DomiciliariosSinRuta().Select(p => new DomiciliarioViewModel(p));
        }
    }
}
