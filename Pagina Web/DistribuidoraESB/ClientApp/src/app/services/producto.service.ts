import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Producto } from '../ESB/Models/producto';
import { tap, catchError } from 'rxjs/operators';

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

  registrar(producto: Producto): Observable<Producto>
  {
    return  this.http.post<Producto>(this.baseUrl+'api/Producto',producto)
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Producto>('Registrar Producto', null))
    )
    
  }

  todos():Observable<Producto[]>
  {
    return  this.http.get<Producto[]>(this.baseUrl+'api/Producto')
    .pipe(
      tap(_ => this.handleErrorService.log('Resgitrado')),
      catchError(this.handleErrorService.handleError<Producto[]>('Registrar Producto', null))
    )
  }
}
