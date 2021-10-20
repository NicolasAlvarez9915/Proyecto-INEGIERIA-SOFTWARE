import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Usuario } from '../ESB/Models/usuario';
import {tap, catchError, map} from 'rxjs/operators';
import {Respuesta} from "../models/respuesta";
import {Ruta} from '../ESB/Models/ruta';

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

  post(usuario : Usuario): Observable<Respuesta<Usuario>>
  {
    return this.http.post<Respuesta<Usuario>>(this.baseUrl+'api/Usuario',usuario)
      .pipe(
        catchError(this.handleErrorService.handleError<Respuesta<Usuario>>('Fallo al crear al usuario.', null))
      );
  }
  validarSession(correo: string): Observable<Respuesta<Usuario>>{
    return this.http.get<Respuesta<Usuario>>(this.baseUrl+'api/Usuario/'+correo)
      .pipe(
        catchError(this.handleErrorService.handleError<Respuesta<Usuario>>('Fallo al validar la session.', null))
      );
  }

  eliminarUsuario(id: string): Observable<string>
  {
    return this.http.delete<string>(this.baseUrl+'api/Usuario/'+id)
      .pipe(
        catchError(this.handleErrorService.handleError<string>('Fallo al eliminar el usuario.', null))
      );
  }

  actualizarContraseña(usuario: Usuario): Observable<Respuesta<String>>
  {
    return this.http.put<Respuesta<String>>(this.baseUrl+'api/Usuario/Todo',usuario)
      .pipe(
        catchError(this.handleErrorService.handleError<Respuesta<String>>('Fallo al buscar la ruta del domiciliario.', null))
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
