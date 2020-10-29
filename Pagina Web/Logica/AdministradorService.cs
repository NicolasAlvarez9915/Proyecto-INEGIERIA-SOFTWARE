using System;
using Datos;
using Entity;

namespace Logica
{
    public class AdministradorService
    {
        private readonly DESBContext context;

        public AdministradorService(DESBContext context)
        {
            this.context = context;
        }

        public AdministradorResponse Guardar(Administrador administrador)
        {
            try
            {
                context.administradores.Add(administrador);
                context.SaveChanges();
                return new AdministradorResponse(administrador);
            }
            catch (Exception e)
            {
                return new AdministradorResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public AdministradorResponse Buscar(string Identificacion){
            Administrador administrador = context.administradores.Find(Identificacion);
            return new AdministradorResponse(administrador);
        }
    }
     public class AdministradorResponse 
        {
            public AdministradorResponse(Administrador administrador)
            {
                Error = false;
                this.adminitrador = administrador;
            }
            public AdministradorResponse(string mensaje)
            {
                Error = true;
                this.Mensaje = mensaje;
            }
            public string Mensaje { get; set; }
            public bool Error { get; set; }
            public Administrador adminitrador { get; set; }
        }
}
