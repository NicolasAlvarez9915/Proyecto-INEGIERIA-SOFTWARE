import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Cliente } from '../ESB/Models/cliente';
import {tap, catchError, map} from 'rxjs/operators';
import {Respuesta} from '../models/respuesta';
import {Usuario} from '../ESB/Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl: string;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService)
  {
      this.baseUrl = baseUrl;
  }

  eliminarCliente(id: string): Observable<Respuesta<Cliente>>
  {
    return this.http.delete<Respuesta<Cliente>>(this.baseUrl+'api/Cliente/'+id)
      .pipe(
        catchError(this.handleErrorService.handleError<Respuesta<Cliente>>('Fallo al eliminar cliente.', null))
      );
  }

  buscar(identificacion: string): Observable<Respuesta<Cliente>>
  {
    return this.http.get<Respuesta<Cliente>>(this.baseUrl+'api/Cliente/'+identificacion).pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Cliente>>('Fallo al buscar al cliente.',null))
    );
  }

  Todos(): Observable<Cliente[]>
  {
    return this.http.get<Cliente[]>(this.baseUrl+'api/Cliente')
  }

  post(cliente: Cliente, usuario: Usuario): Observable<Respuesta<Cliente>>
  {
    return this.http.post<Respuesta<Cliente>>(this.baseUrl+'api/CrearPersona/Cliente',{cliente, usuario}).pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Cliente>>('Fallo al registrar el cliente.',null))
    );
  }

  Actualizar(cliente: Cliente): Observable<Respuesta<Cliente>>
  {
    return this.http.put<Respuesta<Cliente>>(this.baseUrl+'api/Cliente',cliente).pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Cliente>>('Fallo al actualizar al cliente.',null))
    );
  }
}
