import { DetalleDePedido } from "./detalle-de-pedido";

export class Pedido {
    codigo: string;
    idPersona: string;
    fecha: Date;
    subTotal: number;
    detallesDePedidos: DetalleDePedido[];
    iva: number;
    total: number;
    descuento: number;
    totalIva: number;
    estado: string;
}
