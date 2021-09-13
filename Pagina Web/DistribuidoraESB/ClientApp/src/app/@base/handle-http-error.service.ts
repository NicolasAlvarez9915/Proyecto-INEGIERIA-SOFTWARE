import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorService {

  constructor(
    private modalService: NgbModal) { }
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
    const messageBox = this.modalService.open(AlertModalComponent)
    messageBox.componentInstance.title = "ALERTA.";
    messageBox.componentInstance.message = mensaje;
  }
}
