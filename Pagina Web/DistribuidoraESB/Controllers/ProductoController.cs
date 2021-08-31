using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Datos;
using DistribuidoraESB.Hubs;
using DistribuidoraESB.Models;
using Entity;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
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
        private readonly IWebHostEnvironment _webHostEnviroment;
        public ProductoController(DESBContext context, IHubContext<SignalHub> hubContext, IWebHostEnvironment webHostEnviroment)
        {
            _webHostEnviroment = webHostEnviroment;
            _hubContext = hubContext;
            service = new ProductoService(context);
        }

        [HttpPut]
        public ActionResult<ProductoViewModel> Put(ProductoInputModel productoInput)
        {
            var response = service.Abastecer(productoInput.MapearEntrada());
            return Ok(response.Objeto);
        }

        [HttpGet("Busar/{codigo}")]
        public ActionResult<ProductoViewModel> GetProducto(string codigo)
        {
            var response = service.BuscarProducto(codigo);
            if(response.Error)
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.Objeto);
        }


        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<ProductoViewModel>> Post([FromForm]ProductoInputModel productoInput)
        {
            if (productoInput == null)
            {
                productoInput.InicializarModelo(Request.Form);
            }
            productoInput.CrearArchivo(_webHostEnviroment);
            var producto = productoInput.MapearEntrada();
            var response = service.ValidarGuardar(producto,_webHostEnviroment.WebRootPath);
            if(!response.Error) await _hubContext.Clients.All.SendAsync("RegistrarProducto", response.Objeto);
            return StatusCode(response.CodigoHttp, response);
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
