import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Descuento } from '../ESB/Models/descuento';
import { tap, catchError } from 'rxjs/operators';
import { Producto } from '../ESB/Models/producto';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  DescuentosPorCliente(IdCliente: string): Observable<Descuento[]>{
    return this.http.get<Descuento[]>(this.baseUrl+'api/Descuento/'+IdCliente).pipe(
      catchError(this.handleErrorService.handleError<Descuento[]>('Fallo al buscar los descuentos.',null))
    );
  }

  ProductosSinDescuento(IdCliente: string): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.baseUrl+'api/Descuento/string/'+IdCliente).pipe(
      catchError(this.handleErrorService.handleError<Producto[]>('Fallo al buscar los productos sin descuentos.',null))
    );
  }

  registrarDescuentos(descuentos: Descuento[]): Observable<Descuento>{
    return this.http.post<Descuento>(this.baseUrl+'api/Descuento',descuentos).pipe(
      catchError(this.handleErrorService.handleError<Descuento>('Fallo al registrar los descuentos.',null))
    );
  }
}
