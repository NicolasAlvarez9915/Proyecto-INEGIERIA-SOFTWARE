using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;

namespace Logica
{
    public class SecretariaService
    {
        private readonly DESBContext context;

        public SecretariaService(DESBContext context)
        {
            this.context = context;
        }
        public Respuesta<Secretaria> Buscar(string Identificacion){
            Secretaria secretaria = context.Secretarias.Find(Identificacion);
            return (secretaria != null) 
                ? new(secretaria, 200) 
                : new("Secretaria inexistente", 404);
        }

        public List<Secretaria> Todos()
        {
            return context.Secretarias.ToList();
        }
    }
}