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
        private readonly PedidoService pedidoService;
        public RutaController(DESBContext context)
        {
            service = new RutaService(context);
            pedidoService = new PedidoService(context);
        }

        [HttpPost]
        public ActionResult<RutaViewModel> Post(RutaInputModel rutaInput)
        {
            var response = service.Guardar(MapearRuta(rutaInput));
            return Ok(response.ruta);
        }
        private Pedido MapearPedido(PedidoInputModel pedidoInput)
        {
            var pedido = new Pedido
            {
                Codigo = pedidoInput.Codigo,
                Descuento = pedidoInput.Descuento,
                DetallesDePedidos = pedidoInput.DetallesDePedidos,
                Fecha = pedidoInput.Fecha,
                IdPersona = pedidoInput.IdPersona,
                Iva = pedidoInput.Iva,
                SubTotal = pedidoInput.SubTotal,
                Total = pedidoInput.Total,
                TotalIva = pedidoInput.TotalIva,
                Estado = pedidoInput.Estado
            };
            return pedido;
        }

        [HttpGet]
        public IEnumerable<RutaViewModel> Get()
        {
            return service.Rutas().Select(p => new RutaViewModel(p));
        }

        [HttpGet("{Identificacion}")]
        public ActionResult<RutaViewModel> Get(string Identificacion)
        {
            var respose = service.BuscarRuta(Identificacion);
            if (respose.Error){
                return BadRequest(respose.Mensaje);
            }
            return Ok(respose.ruta);
        }

        private Ruta MapearRuta(RutaInputModel rutaInput)
        {
            var ruta = new Ruta
            {
                Codigo = rutaInput.Codigo,
                CodDomiciliario = rutaInput.CodDomiciliario,
                Pedidos = rutaInput.Pedidos
            };
            return ruta;
        }
    }
}
