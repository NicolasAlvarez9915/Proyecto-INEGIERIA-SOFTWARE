import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Usuario } from '../ESB/Models/usuario';
import { Respuesta } from '../models/respuesta';
import {AlertModalComponent} from '../@base/alert-modal/alert-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;
  baseUrl: string;
  constructor(
    private handleErrorService: HandleHttpErrorService,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.baseUrl = baseUrl;
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  login(correo, contraseña): Observable<Respuesta<Usuario>> {
    return this.http.post<Respuesta<Usuario>>(`${this.baseUrl}api/Usuario/InicioSesion`, { correo, contraseña })
      .pipe(
        tap(respuesta => {
          if(!respuesta.error){
            localStorage.setItem('currentUser', JSON.stringify(respuesta.objeto));
            this.currentUserSubject.next(respuesta.objeto);
          }
        }),
        catchError(this.handleErrorService.handleError<Respuesta<Usuario>>('Fallo al iniciar sesión.', null))
        );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


}
