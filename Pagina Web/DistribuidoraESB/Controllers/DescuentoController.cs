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
    public class DescuentoController: ControllerBase
    {
        private readonly DescuentoService service;
        public DescuentoController(DESBContext context)
        {
            service = new DescuentoService(context);
        }

        [HttpPost]
        public ActionResult<DescuentoViewModel> Post(List<DescuentoInputModel> descuentosInput)
        {
            List<Descuento> descuentos = descuentosInput.Select(p => p.MapearEntrada()).ToList();
            var response = service.Guardar(descuentos);
            return StatusCode(response.CodigoHttp,response);
        }

        [HttpGet("{Identificacion}")]
        public IEnumerable<DescuentoViewModel> get(string Identificacion)
        {
            return service.DescuentosCliente(Identificacion).Select(p => new DescuentoViewModel(p));
        }

        [HttpGet("string/{identificacion}")]
        public IEnumerable<ProductoViewModel> Get(string identificacion)
        {
            return service.ProductosSinDescuento(identificacion).Select(p => new ProductoViewModel(p));
        }
    }
}
