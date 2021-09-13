import { DetalleDePedido } from "./detalle-de-pedido";
import {Producto} from './producto';
import {Descuento} from './descuento';
import {Cliente} from './cliente';

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
  codRuta: string;
}
