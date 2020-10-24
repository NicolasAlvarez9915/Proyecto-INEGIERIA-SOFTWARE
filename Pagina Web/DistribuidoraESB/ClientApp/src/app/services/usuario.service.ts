import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Usuario } from '../ESB/Models/usuario';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl: string;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService)
  {
      this.baseUrl = baseUrl;
  }

  validarSession(correo: string): Observable<Usuario>{
    return this.http.get<Usuario>(this.baseUrl+'api/Usuario/'+correo)
    .pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<Usuario>('Validar Usuario', null))
    );
  }

  GuardarUsuarioSesion(usuario: Usuario){
    localStorage.setItem('Usuario', JSON.stringify(usuario));
  }

  UsuarioLogueado(){
    return JSON.parse(localStorage.getItem('Usuario'));
  }

  EliminarUsuarioSesion(){
    localStorage.removeItem('Usuario');
  }
}
