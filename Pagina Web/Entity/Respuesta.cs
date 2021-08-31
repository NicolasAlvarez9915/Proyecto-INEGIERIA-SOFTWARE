using System;

namespace Entity
{
    public class Respuesta<T>
    {
        public int CodigoHttp { get; set; }
        public Boolean Error { get; set; }
        public String Mensaje { get; set; }
        public T Objeto { get; set; }
        public Respuesta()
        {
            
        }

        public Respuesta(String mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        
        public Respuesta(T objeto)
        {
            Error = false;
            Objeto = objeto;
        }
        
        public Respuesta(String mensaje, Boolean error)
        {
            Error = error;
            Mensaje = mensaje;
        }
        
        public Respuesta(String mensaje, int codigoHttp)
        {
            CodigoHttp = codigoHttp;
            Error = true;
            Mensaje = mensaje;
        }

        public Respuesta(T objeto, int codigoHttp)
        {
            CodigoHttp = codigoHttp;
            Error = false;
            Objeto = objeto;
        }
        
        public Respuesta(String mensaje, Boolean error, int codigoHttp)
        {
            CodigoHttp = codigoHttp;
            Error = error;
            Mensaje = mensaje;
        }
    }
}