import { Pipe, PipeTransform } from '@angular/core';
import {Cliente} from '../ESB/Models/cliente';
import {Secretaria} from '../ESB/Models/secretaria';

@Pipe({
  name: 'filtroSecre'
})
export class FiltroSecrePipe implements PipeTransform {

  transform(secretarias: Secretaria[], identificacion: string): any {
    if (identificacion == null) return secretarias;
    return secretarias.filter(p=>
      this.concatenarTodo(p).toLowerCase()
        .indexOf(identificacion.toLowerCase()) !== -1
    );
  }

  concatenarTodo(dato: Secretaria): string{
    return dato.identificacion+ " "+dato.nombres+ " "+dato.apellidos;
  }
}
