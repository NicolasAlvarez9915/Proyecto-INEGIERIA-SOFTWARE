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
    public class PedidoController : ControllerBase
    {
        private readonly PedidoService service;
        private readonly ProductoService productoService;

        private readonly IHubContext<SignalHub> _hubContext;
        public PedidoController(DESBContext context, IHubContext<SignalHub> hubContext)
        {
            _hubContext = hubContext;
            service = new PedidoService(context);
            productoService = new ProductoService(context);
        }

        [HttpGet("SinRuta")]

        public IEnumerable<PedidoViewModel> GetSinRuta()
        {
            return service.SinRuta().Select(p => new PedidoViewModel(p));
        }

        [HttpGet("Entregados/{Identificacion}")]

        public IEnumerable<PedidoViewModel> GetEntregados(string Identificacion)
        {
            return service.PedidosEntregadosCliente(Identificacion).Select(p => new PedidoViewModel(p));
        }

        
        [HttpGet("EnProceso/{Identificacion}")]

        public IEnumerable<PedidoViewModel> GetEnProceso(string Identificacion)
        {
            return service.PedidosEnProcesoCliente(Identificacion).Select(p => new PedidoViewModel(p));
        }

        [HttpPut("{Estado}")]
        public ActionResult Put(string Estado, PedidoInputModel pedidoInputModel)
        {
            return StatusCode(201,service.ActualizarEstado(pedidoInputModel.Codigo, Estado));
        }

        [HttpGet("{codigo}")]

        public ActionResult<PedidoViewModel> GetPedido(string codigo)
        {
            var response = service.buscarPedido(codigo);
            return StatusCode(response.CodigoHttp, response);
        }


        [HttpGet]

        public IEnumerable<PedidoViewModel> Get()
        {
            return service.Pedidos().Select(p => new PedidoViewModel(p));
        }

        [HttpPost]
        public ActionResult<PedidoViewModel> Post(SolicituDePedidoInputModel solicituDePedidoInputModel)
        {

            ClienteInputModel clienteInput = solicituDePedidoInputModel.Cliente;
            List<ProductoInputModel> productoInputs = solicituDePedidoInputModel.productos;
            List<Producto> productos = productoInputs.Select(p => p.MapearEntrada()).ToList();
            var response = service.GenerarPedido(productos, clienteInput.MapearCliente());
            return StatusCode(response.CodigoHttp, response);
        }

        [HttpPost("Registrar/")]
        public async Task<ActionResult<PedidoViewModel>> PostPedido(PedidoInputModel pedidoInputModel)
        {
            var response = service.Guardar(pedidoInputModel.MapearPedido());
            if (!response.Error)
            {
                productoService.ActualizarCantidadProductos(pedidoInputModel.MapearPedido());
                await _hubContext.Clients.All.SendAsync("RegistrarPedido", response.Objeto);
            }
            return StatusCode(response.CodigoHttp, response);
        }

    }
}
