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

        public Respuesta<Administrador> Guardar(Administrador administrador)
        {
            try
            {
                context.Administradores.Add(administrador);
                context.SaveChanges();
                return new (administrador,200);
            }
            catch (Exception e)
            {
                return new ($"Error de la aplicacion: {e.Message}",500);
            }
        }

        public Respuesta<Administrador> ValidarCrear(Administrador administrador)
        {
            try
            {
                Respuesta<Administrador> AdministradorEncontrador = Buscar(administrador.Identificacion);
                return (AdministradorEncontrador.Error)
                    ? new("Arministrador inexistente", 500)
                        : Guardar(administrador);
            }
            catch (Exception e)
            {
                return new ($"Error al validar el crear: {e.Message}",500);
            }
        }

        public Respuesta<Administrador> Buscar(string Identificacion){
            Administrador administrador = context.Administradores.Find(Identificacion);
            return (administrador != null) 
                ? new(administrador, 200) 
                    : new("Arministrador inexistente", 404);
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
}
