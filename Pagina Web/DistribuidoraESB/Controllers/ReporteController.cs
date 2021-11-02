using System.Collections.Generic;
using System.Threading.Tasks;
using Datos;
using Entity;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Rotativa.AspNetCore;
using Rotativa.AspNetCore.Options;
using Wkhtmltopdf.NetCore;

namespace DistribuidoraESB.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteController: ControllerBase
    {
        private readonly IGeneratePdf GeneratePdf;
        private ClienteService ClienteService;
        private readonly IWebHostEnvironment _webHostEnviroment;

        public ReporteController(IGeneratePdf generatePdf, DESBContext context,IWebHostEnvironment webHostEnviroment)
        {
            GeneratePdf = generatePdf;
            ClienteService = new(context);
            _webHostEnviroment = webHostEnviroment;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            var clientes = ClienteService.Todos();
            Datos<List<Cliente>> datos = new()
            {
                Objeto = clientes,
                Ruta = _webHostEnviroment.WebRootPath + @"/Imagenes"
            };
            return await GeneratePdf.GetPdf("Pages/ClienteReport.cshtml", datos);
        }
        [HttpGet("Rotativa")]
        [AllowAnonymous]
        public IActionResult GetRotativa()
        {
            var clientes = ClienteService.Todos();
            Datos<List<Cliente>> datos = new()
            {
                Objeto = clientes,
                Ruta = _webHostEnviroment.WebRootPath + @"/Imagenes"
            };
            return new ViewAsPdf("Pages/ClienteReport.cshtml", datos)
            {
                PageOrientation = Orientation.Landscape
            };
        }
    }

    public class Datos<T>
    {
        public T Objeto { get; set; }
        public string Ruta { get; set; }
    }
}