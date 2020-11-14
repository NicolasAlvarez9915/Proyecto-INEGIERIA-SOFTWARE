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

        public ProductoResponse Guardar(Producto producto)
        {
            try
            {
                context.Productos.Add(GenerarCodigo(producto));
                context.SaveChanges();
                return new ProductoResponse(producto);
            }
            catch (Exception e)
            {
                return new ProductoResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        private Producto GenerarCodigo(Producto producto)
        {
            var random = new Random();
            string codigo = random.Next().ToString(); 
            if(ValidarCodigo(codigo))
            {
                producto.Codigo = codigo;
                return producto;
            }
            GenerarCodigo(producto);
            return null;
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
