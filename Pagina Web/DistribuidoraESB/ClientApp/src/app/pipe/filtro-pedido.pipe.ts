import { Pipe, PipeTransform } from '@angular/core';
import { Pedido } from '../ESB/Models/pedido';

@Pipe({
  name: 'filtroPedido'
})
export class FiltroPedidoPipe implements PipeTransform {

  transform(pedidos: Pedido[], searchText: string): any {
    if (searchText == null) return pedidos;
    return pedidos.filter(p =>
    p.codigo  .toLowerCase()
    .indexOf(searchText.toLowerCase()) !== -1);
  }

}
