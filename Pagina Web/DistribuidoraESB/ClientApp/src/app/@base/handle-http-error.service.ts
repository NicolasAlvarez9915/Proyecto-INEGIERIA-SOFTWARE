import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import {ModalService} from '../compartido/servicios/modal.service';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorService {

  constructor(
    private modalService: ModalService) { }
  public handleError<T>(operation = 'operation', result?: T, mostrarError: boolean = true) {
    return (error: any): Observable<T> => {
      var mensaje = error.error.mensaje;
      if(error.status == 500){
        mensaje = "Error del servidor.";
        console.log(error.error.message);
      }
      if(mostrarError){
        this.alertaRespuestaError(mensaje);
      }
      return of(result as T);
    };
    }
    public log(message: string) {
      console.log(message);
    }
  alertaRespuestaError(mensaje){
    this.modalService.openDialogInfo("Error al realizar la accion", mensaje, 2);
  }
}
