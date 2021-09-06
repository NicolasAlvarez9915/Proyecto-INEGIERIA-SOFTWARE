import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador } from '../ESB/Models/administrador';
import {tap, catchError, map} from 'rxjs/operators';
import {Respuesta} from "../models/respuesta";

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  baseUrl: string;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string)
  {
      this.baseUrl = baseUrl;
  }

  buscar(identificacion: string): Observable<Respuesta<Administrador>>
  {
    return this.http.get<Respuesta<Administrador>>(this.baseUrl+'api/Adminstrador/'+identificacion)
  }

  Actualizar(administrador: Administrador): Observable<String>
  {
    return this.http.put<String>(this.baseUrl+'api/Adminstrador/Todo',administrador)
  }
}
