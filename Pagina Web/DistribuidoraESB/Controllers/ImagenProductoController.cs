using System;
using System.Collections.Generic;
using System.IO;
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
    public class ImagenProductoController : ControllerBase
    {
        private readonly ImagenProductoService service;

        public ImagenProductoController(DESBContext context)
        {
            service = new ImagenProductoService(context);
        }

        [HttpPost]
        public ActionResult Post()
        {
            ImagenProducto imagenProducto = new ImagenProducto();
            try
            {
                var file = Request.Form;
                var imagen = file.Files[0];


                if (imagen.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        imagen.CopyTo(memoryStream);
                        imagenProducto.Imagen = memoryStream.ToArray();
                        foreach (var key in file.Keys)
                        {
                            var value = file[key.ToString()];
                            imagenProducto.CodProducto = value.ToString();
                        }
                    }
                    var response = service.Guardar(imagenProducto);
                    if (response.Error)
                    {
                        return BadRequest(response.Mensaje);
                    }
                    return Ok(response.imagenProducto.CodProducto);
                }
                else
                {
                    return BadRequest("Error en el controlador");
                }

            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpGet("{codigo}")]
        public ActionResult<ImagenProductoViewModel> Gets(string codigo)
        {
            return Ok(new ImagenProductoViewModel(service.BuscarImagen(codigo)));
        }

        [HttpGet]
        public IEnumerable<ImagenProductoViewModel> GetTodas(string codigo)
        {
            return service.Todas().Select(p => new ImagenProductoViewModel(p));
        }
    }
}
