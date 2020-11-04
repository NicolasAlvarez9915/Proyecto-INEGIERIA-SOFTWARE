using System.ComponentModel.Design.Serialization;
using System.Threading;
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
                context.Administradores.Add(administrador);
                context.SaveChanges();
                return new AdministradorResponse(administrador);
            }
            catch (Exception e)
            {
                return new AdministradorResponse($"Error de la aplicacion: {e.Message}");
            }
        }

        public AdministradorResponse Buscar(string Identificacion){
            Administrador administrador = context.Administradores.Find(Identificacion);
            return new AdministradorResponse(administrador);
        }

        public void ActualizarInfo(Administrador administrador)
        {
            Administrador administradorEncontrado = context.Administradores.Find(administrador.Identificacion);
            if(administradorEncontrado.Nombres != administrador.Nombres)
            {
                administradorEncontrado.Nombres = administrador.Nombres;
            }
            if(administradorEncontrado.Apellidos != administrador.Apellidos)
            {
                administradorEncontrado.Apellidos = administrador.Apellidos;
            }
            if(administradorEncontrado.Puesto != administrador.Puesto)
            {
                administradorEncontrado.Puesto = administrador.Puesto;
            }
            if(administradorEncontrado.Telefono != administrador.Telefono)
            {
                administradorEncontrado.Telefono = administrador.Telefono;
            }
            if(administradorEncontrado.Whatsapp != administrador.Whatsapp)
            {
                administradorEncontrado.Whatsapp = administrador.Whatsapp;
            }
            context.Administradores.Update(administradorEncontrado);
            context.SaveChanges();
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
