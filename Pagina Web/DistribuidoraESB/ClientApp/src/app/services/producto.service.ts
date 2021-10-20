import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Producto } from '../ESB/Models/producto';
import {tap, catchError, map} from 'rxjs/operators';
import {Respuesta} from '../models/respuesta';
import {ProductoByCategoria} from '../ESB/Models/producto-by-categoria';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  Abastecer(producto: Producto): Observable<Respuesta<Producto>>
  {
    return this.http.put<Respuesta<Producto>>(this.baseUrl+'api/Producto',producto)
    .pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Producto>>('Fallo al actualizar el producto.', null))
    );
  }

  registrar(producto: Producto, imagen: File): Observable<Respuesta<Producto>>
  {
    const fd =  new FormData();
    fd.append('Codigo',producto.codigo);
    fd.append('Categoria', producto.categoria);
    fd.append('Nombre', producto.nombre);
    fd.append('Cantidad', producto.cantidad.toString());
    fd.append('CantidadMinima', producto.cantidadMinima.toString());
    fd.append('Descripcion', producto.descripcion);
    fd.append('Valor', producto.valor.toString());
    fd.append('Imagen', imagen, imagen.name);
    return  this.http.post<Respuesta<Producto>>(this.baseUrl+'api/Producto',fd)
      .pipe(
        catchError(this.handleErrorService.handleError<Respuesta<Producto>>('Fallo al registrar el producto', null))
      );
  }

  buscar(codigo: string): Observable<Respuesta<Producto>>
  {
    return this.http.get<Respuesta<Producto>>(this.baseUrl+'api/Producto/Busar/'+codigo)
    .pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Producto>>('Fallo al buscar Producto', null))
    )
  }

  todos():Observable<Producto[]>
  {
    return  this.http.get<Producto[]>(this.baseUrl+'api/Producto')
    .pipe(
      catchError(this.handleErrorService.handleError<Producto[]>('Fallo al buscar todos los propductos', null))
    )
  }

  ByCategoria():Observable<Respuesta<ProductoByCategoria>>
  {
    return  this.http.get<Respuesta<ProductoByCategoria>>(this.baseUrl+'api/Producto/ByCategoria')
      .pipe(
        catchError(this.handleErrorService.handleError<Respuesta<ProductoByCategoria>>('Fallo al buscar todos los propductos', null))
      )
  }
  PocasCantidades():Observable<Producto[]>
  {
    return  this.http.get<Producto[]>(this.baseUrl+'api/Producto/PocasCantidades')
    .pipe(
      catchError(this.handleErrorService.handleError<Producto[]>('Fallo al buscar lso productos con pocas cantidades.', null))
    )
  }
}
