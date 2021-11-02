import { Pipe, PipeTransform } from '@angular/core';
import {Cliente} from '../ESB/Models/cliente';
import {Domiciliario} from '../ESB/Models/domiciliario';

@Pipe({
  name: 'filtroDomicliario'
})
export class FiltroDomicliarioPipe implements PipeTransform {

  transform(domiciliarios: Domiciliario[], filtro: string): any {
    if (filtro == null) return domiciliarios;
    return domiciliarios.filter(p=>
      this.concatenarTodo(p).toLowerCase()
        .indexOf(filtro.toLowerCase()) !== -1
    );
  }
  concatenarTodo(dato: Domiciliario): string{
    return dato.identificacion+ " "+dato.nombres+ " "+dato.apellidos;
  }
}
