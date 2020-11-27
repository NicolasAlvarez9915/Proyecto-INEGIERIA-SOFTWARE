import { Cliente } from "./cliente";
import { Producto } from "./producto";

export class SolicitudDePedido {
    fecha: Date;
    cliente: Cliente;
    productos: Producto[];
}
