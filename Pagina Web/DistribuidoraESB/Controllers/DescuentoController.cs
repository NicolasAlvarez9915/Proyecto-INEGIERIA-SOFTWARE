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
    public class DescuentoController: ControllerBase
    {
        private readonly DescuentoService service;
        public DescuentoController(DESBContext context)
        {
            service = new DescuentoService(context);
        }

        [HttpPost]

        public ActionResult<DescuentoViewModel> Post(DescuentoInputModel descuentoInput)
        {
            Descuento descuento = MapearDescuento(descuentoInput);
            var response = service.Guardar(descuento);
            return Ok(response.descuento);
        }

        [HttpGet("{Identificacion}")]
        public IEnumerable<DescuentoViewModel> get(string Identificacion)
        {
            return service.DescuentosCliente(Identificacion).Select(p => new DescuentoViewModel(p));
        }
        private Descuento MapearDescuento(DescuentoInputModel descuentoInput)
        {
            var descuento = new Descuento
            {
                Codigo = descuentoInput.Codigo,
                Porcentaje = descuentoInput.Porcentaje,
                CodProducto = descuentoInput.CodProducto,
                IdPersona = descuentoInput.IdPersona
            };
            return descuento;
        }
    }
}
