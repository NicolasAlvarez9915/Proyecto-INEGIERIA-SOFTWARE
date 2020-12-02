import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../ESB/Models/producto';

@Pipe({
  name: 'filtroProducto'
})
export class FiltroProductoPipe implements PipeTransform {

  transform(productos: Producto[], searchText: string): any {
    if (searchText == null) return productos;
    return productos.filter(p =>
    p.codigo.toLowerCase()
    .indexOf(searchText.toLowerCase()) !== -1);
  }

}
