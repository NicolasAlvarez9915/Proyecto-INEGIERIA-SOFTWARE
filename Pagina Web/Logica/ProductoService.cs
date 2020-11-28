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

        private Boolean ActualizarProducto(Producto producto){
            List<Producto> productoEncontrado = context.Productos.Where<Producto>(p => p.Nombre == producto.Nombre).ToList();
            if(productoEncontrado.Count == 0){
                return false;
            }else{
                productoEncontrado[0].Cantidad += producto.Cantidad;
                if(producto.Descripcion != "No cambiar"){
                    productoEncontrado[0].Descripcion = producto.Descripcion;
                }
                context.Update(productoEncontrado[0]);
                return true;
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
