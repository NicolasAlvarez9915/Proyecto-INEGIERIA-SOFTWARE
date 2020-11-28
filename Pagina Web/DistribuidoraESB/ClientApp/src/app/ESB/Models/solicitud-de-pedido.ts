import { Cliente } from "./cliente";
import { Producto } from "./producto";

export class SolicitudDePedido {
    cliente: Cliente;
    productos: Producto[];
}
