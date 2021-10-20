using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Datos;
using Entity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Logica
{
    public class ProductoService
    {
        
        private readonly DESBContext context;

        public ProductoService(DESBContext context)
        {
            this.context = context;
        }

        public Respuesta<Producto> Abastecer(Producto producto)
        {
            Producto productoEncontrado = BuscarProducto(producto.Codigo).Objeto;
            productoEncontrado.Cantidad += producto.Cantidad;
            context.Productos.Update(productoEncontrado);
            context.SaveChanges();
            return new (productoEncontrado, 201);
        }

        public Respuesta<Producto> BuscarProducto(string codigo)
        {
            Producto producto = context.Productos.Find(codigo);
            if(producto == null)
            {
                return new ("Producto inexistente.",404);
            }
            return new (producto, 200);
        }

        public Respuesta<Producto> ValidarGuardar(Producto producto, string rutalocal)
        {
            try
            {
                if (!ValidarCodigo(producto.Codigo))
                {
                    File.Delete(rutalocal+producto.Ruta);
                    return new ("Producto existente." , 404);
                }
                var productoGuardado = Guardar(producto);
                if (productoGuardado.Error)
                {
                    File.Delete(rutalocal+producto.Ruta);
                }
                return productoGuardado;
            }
            catch (Exception e)
            {
                return new($"Error al validar el registro del producto: {e.Message}", 500);
            }
        }
        
        public Respuesta<Producto> Guardar(Producto producto)
        {
            try
            {
                if(!ValidarCodigo(producto.Codigo)){
                    return new ("Producto existente",409);    
                }
                context.Productos.Add(producto);
                context.SaveChanges();
                return new (producto, 200);
            }
            catch (Exception e)
            {
                return new ($"Error de la aplicacion: {e.Message}", 500);
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
        public List<Producto> TodosPocasCantidades()
        {
            return context.Productos.Where(p => p.Cantidad <=  p.CantidadMinima).ToList();
        }

        public Respuesta<ProductoByCategoria> OrganizarProductoByCategoria()
        {
            List<Producto> todos = Todos();
            ProductoByCategoria resultado = new()
            {
                Pollo = new(),
                CarneCerdo = new(),
                CarneRes = new()
            };
            foreach (var iterador in todos)
            {
                switch(iterador.Categoria)
                {
                  case "Pollo":
                      resultado.Pollo.Add(iterador);
                      break;
                  case "Carne de res":
                      resultado.CarneRes.Add(iterador);
                      break;
                  case "Carne de cerdo":
                      resultado.CarneCerdo.Add(iterador);
                      break;
                }
            }

            return new (resultado, 200);
        }
    }
    
}
