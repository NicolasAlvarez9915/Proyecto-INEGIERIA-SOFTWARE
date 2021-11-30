import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalDesicionComponent} from '../componentes/modal-desicion/modal-desicion.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalInfoComponent} from '../componentes/modal-info/modal-info.component';
import {DetalleRutaPedidoComponent} from '../componentes/detalle-ruta-pedido/detalle-ruta-pedido.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  openDialogDesicion(titulo: string, cuerpo: string): Observable<Boolean>
  {
    let referenciaModal = this.dialog.open(ModalDesicionComponent, {
      data: {titulo: titulo, cuerpo: cuerpo}
    });
    return referenciaModal.afterClosed().pipe(
      map(
        result =>{
          return (result == true)
        }
      )
    );
  }

  openDialogInfo(titulo: string, cuerpo: string, tipo = 1)
  {
    this.dialog.open(ModalInfoComponent, {
      data: {titulo: titulo, cuerpo: cuerpo, tipo: tipo}
    });
  }

  openDialogInfoPedido(idPedido: String)
  {
    return this.dialog.open(DetalleRutaPedidoComponent, {
      data: {idPedido: idPedido}
    });
  }
}
