using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
    public class Producto
    {
        [Key]
        public string Codigo { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Categoria { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Nombre { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Ruta { get; set; }
        [Column(TypeName = "real")]
        public double Cantidad { get; set; }
        [Column(TypeName = "real")]
        public double CantidadMinima { get; set; }
        [Column(TypeName = "int")]
        public int Valor { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Descripcion { get; set; }

        public Respuesta<Producto> ValidarEntidad()
        { 
            Respuesta<Producto> respuesta = null;
            string errores = "";
            if(Codigo == null)
            {
                errores += ";Codigo -> El codigo es requerido. ";
            }else if(Codigo.Length > 20 || Codigo.Length < 3)
            {
                errores += ";Codigo -> La cantidad de caracteres esta fuera de rango. ";
            }

            if(Categoria == null)
            {
                errores += ";Categoria -> La categoria es requerida. ";
            }else if(Categoria != "Pollo" && Categoria != "Carne de res" && Categoria != "Carne de cerdo")
            {
                errores += ";Categoria -> Seleccion incorrecta. ";
            }

            if(Nombre == null)
            {
                errores += ";Nombre -> El Nombre es requerido. ";
            }else if(Nombre.Length > 50 || Nombre.Length < 2)
            {
                errores += ";Nombre -> La cantidad de caracteres esta fuera de rango. ";
            }
            if(Cantidad < 1)
            {
                errores += ";Cantidad -> La cantidad debe ser mayor a 1. ";
            }
            if(CantidadMinima < 1)
            {
                errores += ";CantidadMinima -> La cantidadMinima debe ser mayor a 1. ";
            }
            if(CantidadMinima < 1)
            {
                errores += ";Valor -> Valor debe ser mayor a 1. ";
            }
            if(Descripcion.Length > 200)
            {
                errores += ";Descripcion -> La catidad de caracteres esta fuera de rando. ";
            }
            if(errores != "")
            {
                respuesta = new()
                {
                    CodigoHttp = 409,
                    Error = false,
                    Mensaje = errores,
                    Objeto = this
                };
            }
            return respuesta;
        }
    }
}
