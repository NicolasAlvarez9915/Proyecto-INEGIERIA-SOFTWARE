import { Pipe, PipeTransform } from '@angular/core';
import { Pedido } from '../ESB/Models/pedido';
import {Cliente} from "../ESB/Models/cliente";

@Pipe({
  name: 'filtroPedido'
})
export class FiltroPedidoPipe implements PipeTransform {

  transform(pedidos: Pedido[], searchText: string): any {
    if (searchText == null) return pedidos;
    return pedidos.filter(p =>
      this.concatenarTodo(p).toLowerCase()
    .indexOf(searchText.toLowerCase()) !== -1);
  }

  concatenarTodo(dato: Pedido): string{
    return dato.codigo+ " "+dato.fecha+ " "+dato.idPersona;
  }
}
