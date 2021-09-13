using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Entity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace DistribuidoraESB.Models
{
    public class ProductoInputModel
    {
        public string Codigo { get; set; }
        
        public string Categoria { get; set; }
        
        public string Nombre { get; set; }
        
        public double Cantidad { get; set; }

        public double CantidadMinima { get; set; }
        
        public string Descripcion { get; set; }
        
        public int Valor { get; set; }
        public String Ruta { get; set; }
        
        public IFormFile Imagen { get; set; }
        
        public Producto MapearEntrada()
        {
            return new() 
            {
                Codigo = Codigo,
                Cantidad = Cantidad,
                Descripcion = Descripcion,
                Categoria = Categoria,
                Nombre = Nombre,
                Valor = Valor,
                Ruta = Ruta,
                CantidadMinima = CantidadMinima
            };
        }
        
        public Respuesta<String> InicializarModelo(IFormCollection entrada)
        {
            try
            {
                Imagen = entrada.Files[0];
                Codigo = entrada.Where(x => x.Key == "Codigo").Select(x => x.Value).First().ToString();
                Nombre = entrada.Where(x => x.Key == "Nombre").Select(x => x.Value).First().ToString();
                Descripcion = entrada.Where(x => x.Key == "Descripcion").Select(x => x.Value).First().ToString();
                Cantidad = int.Parse(entrada.Where(x => x.Key == "Cantidad").Select(x => x.Value).First().ToString());
                CantidadMinima = int.Parse(entrada.Where(x => x.Key == "CantidadMinima").Select(x => x.Value).First().ToString());
                Categoria = entrada.Where(x => x.Key == "Categoria").Select(x => x.Value).First().ToString();
                Valor = int.Parse(entrada.Where(x => x.Key == "Valor").Select(x => x.Value).First().ToString());
                return new Respuesta<string>("Todo correcto", false, 200);
            }
            catch (Exception e)
            {
                return new Respuesta<string>($"Error al mapear el modelo: "+e.Message, 500);
            }
        }
        
        public Respuesta<String> CrearArchivo(IWebHostEnvironment webHostEnviroment)
        {
            try
            {
                var rutaImg = webHostEnviroment.WebRootPath + @"/Imagenes";
                var extension = Path.GetExtension(Imagen.FileName);
                var nombreImagen = Imagen.FileName + Guid.NewGuid() + extension;
                var filePath = Path.Combine(rutaImg, nombreImagen);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    Imagen.CopyTo(stream);
                }
                Ruta = $"/Imagenes/{nombreImagen}";
                return new ("Todo correcto", false, 200);
            }
            catch (Exception e)
            {
                return new Respuesta<string>($"Error al crear la imagen: {e.Message}", 500);
            }
                
        }
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
            CantidadMinima = producto.CantidadMinima;
            Ruta = producto.Ruta;
        }
    }
}
