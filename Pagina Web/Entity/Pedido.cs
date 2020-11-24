using System;
using System.Collections.Generic;

namespace Entity
{
    public class Pedido
    {
        public List<DetalleDePedido> DetallesDePedidos { get; set; }
        public string Codigo { get; set; }
        public int MyProperty { get; set; }
    }
}
