import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Domiciliario } from '../ESB/Models/domiciliario';
import { tap, catchError } from 'rxjs/operators';
import { Vehiculo } from '../ESB/Models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class DomiciliarioService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  registrar(domiciliario: Domiciliario): Observable<Domiciliario>{
    return this.http.post<Domiciliario>(this.baseUrl+'api/Domiciliario',domiciliario)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Domiciliario>('Registrar Domiciliaro', null))
    );
  }

  validarExistenciaDomiciliario(idDomiciliario: string): Observable<Domiciliario>{
    return this.http.get<Domiciliario>(this.baseUrl+'api/Domiciliario/Domiciliario/'+idDomiciliario)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Domiciliario>('Buscar Domiciliaro', null))
    );
  }

  validarExistenciaVehiculo(placa: string): Observable<Vehiculo>{
    return this.http.get<Vehiculo>(this.baseUrl+'api/Domiciliario/Vehiculo/'+placa)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Vehiculo>('Buscar Vehiculo', null))
    );
  }

  Todos(): Observable<Domiciliario[]>{
    return this.http.get<Domiciliario[]>(this.baseUrl+'api/Domiciliario')
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Domiciliario[]>('Buscar todos', null))
    );
  }
}
