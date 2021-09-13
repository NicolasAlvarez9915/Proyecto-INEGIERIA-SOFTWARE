import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Ruta } from '../ESB/Models/ruta';
import { tap, catchError } from 'rxjs/operators';
import { Pedido } from '../ESB/Models/pedido';
import {Respuesta} from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RutaService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  registrar(ruta: Ruta): Observable<Respuesta<Ruta>>
  {
    return  this.http.post<Respuesta<Ruta>>(this.baseUrl+'api/Ruta',ruta)
    .pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Ruta>>('Fallo al registrar la ruta.', null))
    )
  }

  AsignarPedidosAUnaRuta(pedidos: Pedido[]): Observable<Respuesta<Pedido>>
  {
    return  this.http.post<Respuesta<Pedido>>(this.baseUrl+'api/Ruta/AsignarPedidos',pedidos)
    .pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Pedido>>('Fallo al asignar pedidos a la ruta.', null))
    )
  }

  rutas(): Observable<Ruta[]>{
    return this.http.get<Ruta[]>(this.baseUrl+'api/Ruta')
    .pipe(
      catchError(this.handleErrorService.handleError<Ruta[]>('Fallo al buscar las ruta', null))
    )
  }

  rutaDomiciliario(idDomiciliario: string, mostrarAlerta: boolean = true): Observable<Respuesta<Ruta>>{
    return this.http.get<Respuesta<Ruta>>(this.baseUrl+'api/Ruta/'+idDomiciliario)
    .pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Ruta>>('Fallo al buscar la ruta del domiciliario.', null, mostrarAlerta))
    );
  }
}
