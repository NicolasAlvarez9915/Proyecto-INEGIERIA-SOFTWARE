import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Cliente } from '../ESB/Models/cliente';
import { Pedido } from '../ESB/Models/pedido';
import { Producto } from '../ESB/Models/producto';
import { SolicitudDePedido } from '../ESB/Models/solicitud-de-pedido';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  baseUrl: string;
  solicitud: SolicitudDePedido = new SolicitudDePedido();
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  generarPedido(cliente: Cliente, productos: Producto[]): Observable<Pedido>{
    
    this.solicitud.cliente = cliente;
    this.solicitud.productos = productos;

    return this.http.post<Pedido>(this.baseUrl+'api/Pedido',this.solicitud)
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Pedido>('Generar pedido', null))
    )
  }

  registrarPedido(pedido: Pedido): Observable<Pedido>{
    return this.http.post<Pedido>(this.baseUrl+'api/Pedido/Registrar',pedido)
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Pedido>('Registrar pedido', null))
    )
  }

  BuscarPedido(codigo: string): Observable<Pedido>{
    return this.http.get<Pedido>(this.baseUrl+'api/Pedido/'+codigo)
    .pipe(
      tap(_ => this.handleErrorService.log('Buscando pedido bien')),
      catchError(this.handleErrorService.handleError<Pedido>('Buscando pedido', null))
    )
  }

  todos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl+'api/Pedido')
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Pedido[]>('Consultar pedidos', null))
    )
  }

  Actualizar(pedido: Pedido, estado: string): Observable<string>
  {
    return this.http.put<string>(this.baseUrl+'api/Pedido/'+estado,pedido)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<string>('Actualizar estado', null))
    );
  }
}
