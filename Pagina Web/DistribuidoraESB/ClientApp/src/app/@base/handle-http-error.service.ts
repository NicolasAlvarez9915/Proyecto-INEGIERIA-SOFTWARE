import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorService {

  constructor() { }
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    return of(error.error);
    };
    }
    public log(message: string) {
    console.log(message);
    }
}
