using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;

namespace Logica
{
    public class ImagenProductoService
    {
        private readonly DESBContext context;

        public ImagenProductoService(DESBContext context)
        {
            this.context = context;
        }

        public ImagenProductoResponse Guardar(ImagenProducto imagenProducto)
        {
            try
            {
                context.ImagenProductos.Add(imagenProducto);
                context.SaveChanges();
                return new ImagenProductoResponse(imagenProducto);
            }
            catch (Exception e)
            {
                return new ImagenProductoResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public ImagenProducto BuscarImagen(string codigo)
        {
            ImagenProducto imagenProducto = context.ImagenProductos.Find(codigo);
            return imagenProducto;
        }   

        public List<ImagenProducto> Todas()
        {
            return context.ImagenProductos.ToList();
        }     
    }
    public class ImagenProductoResponse 
    {
        public ImagenProductoResponse(ImagenProducto imagenProducto )
        {
            Error = false;
            this.imagenProducto  = imagenProducto;
        }
        public ImagenProductoResponse(string mensaje)
        {
            Error = true;
            this.Mensaje = mensaje;
        }
        public string Mensaje { get; set; }
        public bool Error { get; set; }
        public ImagenProducto imagenProducto { get; set; }
    }
    
}
