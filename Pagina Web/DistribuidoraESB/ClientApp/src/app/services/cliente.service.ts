import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Cliente } from '../ESB/Models/cliente';
import {tap, catchError, map} from 'rxjs/operators';
import {Respuesta} from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl: string;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string)
  {
      this.baseUrl = baseUrl;
  }

  buscar(identificacion: string): Observable<Respuesta<Cliente>>
  {
    return this.http.get<Respuesta<Cliente>>(this.baseUrl+'api/Cliente/'+identificacion);
  }

  Todos(): Observable<Cliente[]>
  {
    return this.http.get<Cliente[]>(this.baseUrl+'api/Cliente')
  }

  post(cliente: Cliente): Observable<Respuesta<Cliente>>
  {
    return this.http.post<Respuesta<Cliente>>(this.baseUrl+'api/Cliente',cliente)
  }

  Actualizar(cliente: Cliente): Observable<Respuesta<Cliente>>
  {
    return this.http.put<Respuesta<Cliente>>(this.baseUrl+'api/Cliente',cliente)
  }
}
