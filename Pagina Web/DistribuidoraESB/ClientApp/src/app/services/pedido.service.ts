import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Cliente } from '../ESB/Models/cliente';
import { Pedido } from '../ESB/Models/pedido';
import { Producto } from '../ESB/Models/producto';
import { SolicitudDePedido } from '../ESB/Models/solicitud-de-pedido';
import { tap, catchError } from 'rxjs/operators';
import {Respuesta} from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  generarPedido(cliente: Cliente, productos: Producto[]): Observable<Respuesta<Pedido>>{
    return this.http.post<Respuesta<Pedido>>(this.baseUrl+'api/Pedido',{cliente, productos})
    .pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Pedido>>('Fallo al generar el pedido.', null))
    )
  }

  registrarPedido(pedido: Pedido): Observable<Respuesta<Pedido>>{
    return this.http.post<Respuesta<Pedido>>(this.baseUrl+'api/Pedido/Registrar',pedido)
    .pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Pedido>>('Fallo al registrar el pedido.', null))
    )
  }

  BuscarPedido(codigo: string): Observable<Respuesta<Pedido>>{
    return this.http.get<Respuesta<Pedido>>(this.baseUrl+'api/Pedido/'+codigo)
    .pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Pedido>>('Fallo al buscando el pedido.', null))
    )
  }

  todos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl+'api/Pedido')
    .pipe(
      catchError(this.handleErrorService.handleError<Pedido[]>('Fallo al consultar los pedidos.', null))
    )
  }

  SinRuta(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl+'api/Pedido/SinRuta')
    .pipe(
      catchError(this.handleErrorService.handleError<Pedido[]>('Fallo al consultar los pedidos sin ruta.', null))
    )
  }

  PedidosEntregadosCliente(identificacion: string): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl+'api/Pedido/Entregados/'+identificacion)
    .pipe(
      catchError(this.handleErrorService.handleError<Pedido[]>('Fallo al consultar los pedidos entregados del cliente.', null))
    )
  }

  PedidosEnProcesoCliente(identificacion: string): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl+'api/Pedido/EnProceso/'+identificacion)
    .pipe(
      catchError(this.handleErrorService.handleError<Pedido[]>('Fallo al consultar los pedidos en procesos del cliente.', null))
    )
  }

  Actualizar(pedido: Pedido, estado: string): Observable<Respuesta<Pedido>>
  {
    return this.http.put<Respuesta<Pedido>>(this.baseUrl+'api/Pedido/'+estado,pedido)
      .pipe(
        catchError(this.handleErrorService.handleError<Respuesta<Pedido>>('Fallo al actualizar el estado del pedido.', null))
      );
  }

  obtenerCarrito(){
    let productos: Producto[] = [];
    productos = JSON.parse(localStorage.getItem('Carrito'));
    return productos;
  }
  AnadirProductoAlCarro(producto: Producto){
    let productos: Producto[] = [];
    let encontrado: Boolean = false;
    if (this.obtenerCarrito() != null) {
      productos = this.obtenerCarrito();
    }
    if (productos != null){
      productos.forEach(p =>{
        if(p.codigo == producto.codigo){
          p.cantidad += producto.cantidad;
          encontrado = true;
        }
      });
    }
    if (!encontrado){
      productos.push(producto);
    }
    localStorage.setItem('Carrito', JSON.stringify(productos));
  }
  EliminarProductoDelCarrito(codigo: string){
    let productos: Producto[] = [];
    let productosResultado: Producto[] = [];

    productos = this.obtenerCarrito();
    if (productos != null){
      productos.forEach(p =>{
        if(p.codigo != codigo){
          productosResultado.push(p);
        }
      });
      localStorage.setItem('Carrito', JSON.stringify(productosResultado));
    }
  }

  EliminarCarrito(){
    let productos: Producto[] = [];
    localStorage.setItem('Carrito', JSON.stringify(productos));
  }
}
