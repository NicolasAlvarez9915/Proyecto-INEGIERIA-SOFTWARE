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
    public class ProductoController: ControllerBase
    {
        private readonly ProductoService service;

        public ProductoController(DESBContext context)
        {
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
        public ActionResult<ProductoViewModel> Post(ProductoInputModel productoInput)
        {
            var response = service.Guardar(MapearProducto(productoInput));
            return Ok(response.producto);
        }

        [HttpGet]
        public IEnumerable<ProductoViewModel> Get()
        {
            return service.Todos().Select(p => new ProductoViewModel(p));
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
