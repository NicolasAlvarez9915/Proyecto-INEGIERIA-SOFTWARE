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
    [Route("api/[controller]")]
    [ApiController]
    public class DomiciliarioController: ControllerBase
    {
        private readonly DomiciliarioService service;

        public DomiciliarioController(DESBContext context)
        {
            service = new DomiciliarioService(context);
        }

        [HttpPost]
        public ActionResult<DomiciliarioViewModel> post(DomiciliarioInputModel domiciliarioInput)
        {
            Domiciliario domiciliario = MapearDomiciliario(domiciliarioInput);
            var response = service.Guardar(domiciliario);
            return Ok(response.Domiciliario);
        }

        private Domiciliario MapearDomiciliario(DomiciliarioInputModel domiciliarioInput)
        {
            var domiciliario = new Domiciliario
            {
                Identificacion = domiciliarioInput.Identificacion,
                Nombres = domiciliarioInput.Nombres,
                Apellidos = domiciliarioInput.Apellidos,
                Telefono = domiciliarioInput.Telefono,
                Whatsapp = domiciliarioInput.Whatsapp,
                FechaPermisoConduccion = domiciliarioInput.FechaPermisoConduccion,
                Moto = domiciliarioInput.Moto
            };
            return domiciliario;
        }

        [HttpGet("Domiciliario/{identificacion}")]

        public ActionResult<DomiciliarioViewModel> GetDomiciliario(string identificacion)
        {
            var response = service.ValidarExistenciaDomicilio(identificacion);
            if (response.Error){
                return BadRequest(response.Error);
            }
            return new DomiciliarioViewModel(response.Domiciliario);
        }

        [HttpGet("Vehiculo/{Placa}")]
        public ActionResult<VehiculoViewModel> GetVehiculo(string Placa)
        {
            var response = service.ValidarExistenciaVehiculo(Placa);
            if (response.Error){
                return BadRequest(response.Error);
            }
            return new VehiculoViewModel(response.Vehiculo);
        }

        [HttpGet]
        public IEnumerable<DomiciliarioViewModel> Get()
        {
            return service.Todos().Select(p => new DomiciliarioViewModel(p));
        }
    }
}
