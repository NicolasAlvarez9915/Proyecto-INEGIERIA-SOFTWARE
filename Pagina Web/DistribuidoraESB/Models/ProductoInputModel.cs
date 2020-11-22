using System;
using System.Collections.Generic;
using Entity;

namespace DistribuidoraESB.Models
{
    public class ProductoInputModel
    {
        public string Codigo { get; set; }
        
        public string Categoria { get; set; }
        
        public string Nombre { get; set; }
        
        public decimal Cantidad { get; set; }
        
        public string Descripcion { get; set; }
        
        public int Valor { get; set; }
    }
    
    
    public class ProductoViewModel: ProductoInputModel
    {
        ProductoViewModel()
        {

        }
        public ProductoViewModel(Producto producto)
        {
            Codigo = producto.Codigo;
            Categoria = producto.Categoria;
            Nombre = producto.Nombre;
            Cantidad = producto.Cantidad;
            Descripcion = producto.Descripcion;
            Valor = producto.Valor;
        }
    }
}
