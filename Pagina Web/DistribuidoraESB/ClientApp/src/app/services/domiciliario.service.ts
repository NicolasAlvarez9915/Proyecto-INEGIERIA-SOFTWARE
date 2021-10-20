import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Domiciliario } from '../ESB/Models/domiciliario';
import { tap, catchError } from 'rxjs/operators';
import { Vehiculo } from '../ESB/Models/vehiculo';
import {Respuesta} from '../models/respuesta';
import {Usuario} from '../ESB/Models/usuario';

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

  registrar(domiciliario: Domiciliario, usuario: Usuario): Observable<Respuesta<Domiciliario>>{
    return this.http.post<Respuesta<Domiciliario>>(this.baseUrl+'api/CrearPersona',{domiciliario, usuario}).pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Domiciliario>>('Fallo al registrar el domiciliario.',null))
    );
  }

  eliminarDomiciliario(id: string): Observable<Respuesta<Domiciliario>>
  {
    return this.http.delete<Respuesta<Domiciliario>>(this.baseUrl+'api/Domiciliario/'+id)
      .pipe(
        catchError(this.handleErrorService.handleError<Respuesta<Domiciliario>>('Fallo al eliminar domiciliario.', null))
      );
  }

  validarExistenciaDomiciliario(idDomiciliario: string): Observable<Respuesta<Domiciliario>>{
    return this.http.get<Respuesta<Domiciliario>>(this.baseUrl+'api/Domiciliario/Domiciliario/'+idDomiciliario).pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Domiciliario>>('Fallo al buscar al domiciliario.',null))
    );
  }

  validarExistenciaVehiculo(placa: string): Observable<Respuesta<Vehiculo>>{
    return this.http.get<Respuesta<Vehiculo>>(this.baseUrl+'api/Domiciliario/Vehiculo/'+placa).pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Vehiculo>>('Fallo al  buscar el vehiculo.',null))
    );
  }

  Todos(): Observable<Domiciliario[]>{
    return this.http.get<Domiciliario[]>(this.baseUrl+'api/Domiciliario').pipe(
      catchError(this.handleErrorService.handleError<Domiciliario[]>('Fallo al obtener todos los domiciliarios.',null))
    );
  }

  buscarVehiculo(idDomiciliario: string): Observable<Respuesta<Vehiculo>>{
    return this.http.get<Respuesta<Vehiculo>>(this.baseUrl+'api/Domiciliario/BuscarVehiculo/'+idDomiciliario).pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Vehiculo>>('Fallo al buscar el vehiculo.',null))
    );
  }

  sinRuta(): Observable<Domiciliario[]>{
    return this.http.get<Domiciliario[]>(this.baseUrl+'api/Domiciliario/SinRuta').pipe(
      catchError(this.handleErrorService.handleError<Domiciliario[]>('Fallo al obtener los domiciliarios disponibles',null))
    );
  }
}
