using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Datos;
using DistribuidoraESB.Hubs;
using DistribuidoraESB.Models;
using Entity;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace DistribuidoraESB.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController: ControllerBase
    {
        private readonly ProductoService service;
        private readonly IHubContext<SignalHub> _hubContext;
        public ProductoController(DESBContext context, IHubContext<SignalHub> hubContext)
        {
            _hubContext = hubContext;
            service = new ProductoService(context);
        }

        [HttpPut]
        public ActionResult<ProductoViewModel> Put(ProductoInputModel productoInput)
        {
            var response = service.Abastecer(MapearProducto(productoInput));
            return Ok(response.producto);
        }

        [HttpGet("Busar/{codigo}")]
        public ActionResult<ProductoViewModel> GetProducto(string codigo)
        {
            var response = service.BuscarProducto(codigo);
            if(response.Error)
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.producto);
        }


        [HttpPost]
        public async Task<ActionResult<ProductoViewModel>> Post(ProductoInputModel productoInput)
        {
            var response = service.Guardar(MapearProducto(productoInput));
            await _hubContext.Clients.All.SendAsync("RegistrarProducto", response.producto);
            return Ok(response.producto);
        }
        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<ProductoViewModel> Get()
        {
            return service.Todos().Select(p => new ProductoViewModel(p));
        }

        
        [HttpGet("PocasCantidades")]
        public IEnumerable<ProductoViewModel> GetPocasCAntidades()
        {
            return service.TodosPocasCantidades().Select(p => new ProductoViewModel(p));
        }

        private Producto MapearProducto(ProductoInputModel productoInput)
        {
            var producto = new Producto
            {
                Codigo = productoInput.Codigo,
                Cantidad = productoInput.Cantidad,
                Descripcion = productoInput.Descripcion,
                Categoria = productoInput.Categoria,
                Nombre = productoInput.Nombre,
                Valor = productoInput.Valor,
                CantidadMinima = productoInput.CantidadMinima
            };
            return producto;
        }
        private Descuento MapearDescuento(DescuentoInputModel descuentoInput)
        {
            var descuento = new Descuento
            {
                Codigo = descuentoInput.Codigo,
                Porcentaje = descuentoInput.Porcentaje
            };
            return descuento;
        }
    }
}
