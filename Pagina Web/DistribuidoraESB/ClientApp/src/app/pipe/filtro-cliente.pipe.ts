import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../ESB/Models/cliente';

@Pipe({
  name: 'filtroCliente'
})
export class FiltroClientePipe implements PipeTransform {

  transform(clientes: Cliente[], identificacion: string): any {
    if (identificacion == null) return clientes;
     return clientes.filter(p=>
      this.concatenarTodo(p).toLowerCase()
      .indexOf(identificacion.toLowerCase()) !== -1
      );
  }
  concatenarTodo(dato: Cliente): string{
    return dato.identificacion+ " "+dato.nombres+ " "+dato.apellidos;
  }
}
