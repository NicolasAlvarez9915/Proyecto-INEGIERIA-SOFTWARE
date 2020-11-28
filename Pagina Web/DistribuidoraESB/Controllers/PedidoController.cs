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
    public class PedidoController : ControllerBase
    {
        private readonly PedidoService service;

        public PedidoController(DESBContext context)
        {
            service = new PedidoService(context);
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
            return new PedidoViewModel(service.GenerarPedido(productoInputs.Select(p => MapearProducto(p)).ToList(), MapearCliente(clienteInput)));
        }

        [HttpPost("Registrar/")]
        public ActionResult<PedidoViewModel> PostPedido(PedidoInputModel pedidoInputModel)
        {
            var response = service.Guardar(MapearPedido(pedidoInputModel));
            return Ok(response.pedido);
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
                TotalIva = pedidoInput.TotalIva
            };
            return pedido;
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
                Valor = productoInput.Valor
            };
            return producto;
        }
        private Cliente MapearCliente(ClienteInputModel clienteInput)
        {
            var cliente = new Cliente
            {
                Identificacion = clienteInput.Identificacion,
                Nombres = clienteInput.Nombres,
                Apellidos = clienteInput.Apellidos,
                Telefono = ValidarNull(clienteInput.Telefono),
                Whatsapp = ValidarNull(clienteInput.Whatsapp),
                Direccion = ValidarNull(clienteInput.Direccion),
                Horaio = ValidarNull(clienteInput.Horaio),
                TipoCliente = ValidarNull(clienteInput.TipoCliente),
                Descuentos = clienteInput.Descuentos
            };
            return cliente;
        }
        private string ValidarNull(string texto)
        {
            if (texto == null)
            {
                return "No asignado";
            }
            return texto;
        }
    }
}
