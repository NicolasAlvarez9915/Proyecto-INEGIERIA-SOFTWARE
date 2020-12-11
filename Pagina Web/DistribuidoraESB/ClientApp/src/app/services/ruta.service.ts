import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Ruta } from '../ESB/Models/ruta';
import { tap, catchError } from 'rxjs/operators';
import { Pedido } from '../ESB/Models/pedido';

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

  registrar(ruta: Ruta): Observable<Ruta>
  {
    return  this.http.post<Ruta>(this.baseUrl+'api/Ruta',ruta)
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Ruta>('Registrar Ruta', null))
    )
  }

  AsignarPedidosAUnaRuta(pedidos: Pedido[]): Observable<Pedido>
  {
    return  this.http.post<Pedido>(this.baseUrl+'api/Ruta/AsignarPedidos',pedidos)
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Pedido>('Asiganar Pedidos a una ruta', null))
    )
  }
  
  rutas(): Observable<Ruta[]>{
    return this.http.get<Ruta[]>(this.baseUrl+'api/Ruta')
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Ruta[]>('Buscar Ruta[]', null))
    )
  }

  rutaDomiciliario(idDomiciliario: string): Observable<Ruta>{
    return this.http.get<Ruta>(this.baseUrl+'api/Ruta/'+idDomiciliario)
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Ruta>('Buscar Ruta[]', null))
    )
  }
}
