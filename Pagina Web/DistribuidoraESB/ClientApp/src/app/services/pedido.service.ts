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

  SinRuta(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl+'api/Pedido/SinRuta')
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Pedido[]>('Consultar pedidos sin ruta', null))
    )
  }

  PedidosEntregadosCliente(identificacion: string): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl+'api/Pedido/Entregados/'+identificacion)
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Pedido[]>('Consultar pedidos', null))
    )
  }

  PedidosEnProcesoCliente(identificacion: string): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl+'api/Pedido/EnProceso/'+identificacion)
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
    let productosR: Producto[] = [];
    
    productos = this.obtenerCarrito();
    if (productos != null){
      productos.forEach(p =>{
        if(p.codigo != codigo){
          productosR.push(p);
        }
      });
      localStorage.setItem('Carrito', JSON.stringify(productosR));
    }
  }  

  EliminarCarrito(){
    let productos: Producto[] = [];
    localStorage.setItem('Carrito', JSON.stringify(productos));
  }
}
