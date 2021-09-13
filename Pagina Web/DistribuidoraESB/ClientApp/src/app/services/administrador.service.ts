import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador } from '../ESB/Models/administrador';
import {tap, catchError, map} from 'rxjs/operators';
import {Respuesta} from "../models/respuesta";
import {HandleHttpErrorService} from '../@base/handle-http-error.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  baseUrl: string;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService)
  {
      this.baseUrl = baseUrl;
  }

  buscar(identificacion: string): Observable<Respuesta<Administrador>>
  {
    return this.http.get<Respuesta<Administrador>>(this.baseUrl+'api/Adminstrador/'+identificacion).pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Administrador>>('Fallo al buscar al administrador.',null))
    );
  }

  Actualizar(administrador: Administrador): Observable<String>
  {
    return this.http.put<String>(this.baseUrl+'api/Adminstrador/Todo',administrador).pipe(
      catchError(this.handleErrorService.handleError<String>('Fallo al actualizar el administrador.',null))
    );
  }
}
