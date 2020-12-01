using System;
using Entity;

namespace DistribuidoraESB.Models
{
    public class ImagenProductoViewModel
    {

        public string CodProducto {get;set;}
        public string Imagen {get;set;}
        public ImagenProductoViewModel()
        {
        }

        public ImagenProductoViewModel(ImagenProducto imagenProducto)
        {
            CodProducto = imagenProducto.CodProducto;
            Imagen = "data:image/jpeg;base64," + ConvertirByteToImage(imagenProducto.Imagen);      
        }   
        public string ConvertirByteToImage(byte[] img)
        { 
            return Convert.ToBase64String(img);
        }

    }
}
