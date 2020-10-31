import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Cliente } from '../ESB/Models/cliente';
import { tap, catchError } from 'rxjs/operators';

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

  buscar(identificacion: string): Observable<Cliente>
  {
    return this.http.get<Cliente>(this.baseUrl+'api/Cliente/'+identificacion)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Cliente>('Buscar Cliente', null))
    );
  }
  
  Todes(): Observable<Cliente[]>
  {
    return this.http.get<Cliente[]>(this.baseUrl+'api/Cliente')
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Cliente[]>('Buscar Cliente', null))
    );
  }

  post(cliente :Cliente): Observable<Cliente>
  {
    return this.http.post<Cliente>(this.baseUrl+'api/Cliente',cliente)
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Cliente>('Registrar Cliente', null))
    );
  }
}