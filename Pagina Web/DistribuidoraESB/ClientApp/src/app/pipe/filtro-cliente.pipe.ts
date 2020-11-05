import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../ESB/Models/cliente';

@Pipe({
  name: 'filtroCliente'
})
export class FiltroClientePipe implements PipeTransform {

  transform(clientes: Cliente[], identificacion: string): any {
    if (identificacion == null) return clientes;
     return clientes.filter(p=>
      p.identificacion.toLowerCase()
      .indexOf(identificacion.toLowerCase()) !== -1
      );
  }

}
