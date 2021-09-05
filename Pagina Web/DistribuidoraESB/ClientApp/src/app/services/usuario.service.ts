import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Usuario } from '../ESB/Models/usuario';
import {tap, catchError, map} from 'rxjs/operators';
import {Respuesta} from "../models/respuesta";

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
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Respuesta<Usuario>>('Registrar Usuario', null))
    );
  }
  validarSession(correo: string): Observable<Respuesta<Usuario>>{
    return this.http.get<Respuesta<Usuario>>(this.baseUrl+'api/Usuario/'+correo)
    .pipe(
      map( Respuesta =>{
        return Respuesta
      })
    );
  }

  actualizarContraseña(usuario: Usuario): Observable<Respuesta<String>>
  {
    return this.http.put<Respuesta<String>>(this.baseUrl+'api/Usuario/Todo',usuario)
    .pipe(
      map( Respuesta =>{
        return Respuesta
      })
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
