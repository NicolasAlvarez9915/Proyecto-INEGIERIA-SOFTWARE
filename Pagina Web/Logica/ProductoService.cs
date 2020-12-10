using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;

namespace Logica
{
    public class ProductoService
    {
        
        private readonly DESBContext context;

        public ProductoService(DESBContext context)
        {
            this.context = context;
        }

        public ProductoResponse Abastecer(Producto producto)
        {
            Producto productoEncontrado = BuscarProducto(producto.Codigo).producto;
            productoEncontrado.Cantidad += producto.Cantidad;
            context.Productos.Update(productoEncontrado);
            context.SaveChanges();
            return new ProductoResponse(productoEncontrado);
        }

        public ProductoResponse BuscarProducto(string codigo)
        {
            Producto producto = context.Productos.Find(codigo);
            if(producto == null)
            {
                return new ProductoResponse("No existe");
            }
            return new ProductoResponse(producto);
        }

        public ProductoResponse Guardar(Producto producto)
        {
            try
            {
                if(!ValidarCodigo(producto.Codigo)){
                    return new ProductoResponse("Producto Existente");    
                }
                context.Productos.Add(producto);
                context.SaveChanges();
                return new ProductoResponse(producto);
            }
            catch (Exception e)
            {
                return new ProductoResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public void ActualizarCantidadProductos(Pedido pedido){
            

            foreach (DetalleDePedido detalleDePedido in pedido.DetallesDePedidos)
            {
                Producto productoEncontrado = context.Productos.Find(detalleDePedido.CodProducto);
                productoEncontrado.Cantidad -= detalleDePedido.Cantidad;
                context.Productos.Update(productoEncontrado);
                context.SaveChanges();
            }
        }
        
        public bool ValidarCodigo(string codigo)
        {
            Producto producto = context.Productos.Find(codigo);

            if(producto == null)
            {
                return true;
            }
            return false;
        }
        public List<Producto> Todos()
        {
            return context.Productos.ToList();
        }
        public int TodosPocasCantidades()
        {
            return context.Productos.Where(p => p.Cantidad <=  p.CantidadMinima).ToList().Count;
        }
    }
    public class ProductoResponse
    {
        public ProductoResponse(Producto producto)
        {
            Error = false;
            this.producto = producto;
        }
        public ProductoResponse(string mensaje)
        {
            Error = true;
            this.Mensaje = mensaje;
        }
        public string Mensaje { get; set; }
        public bool Error { get; set; }
        public Producto producto { get; set; }
    }
}
