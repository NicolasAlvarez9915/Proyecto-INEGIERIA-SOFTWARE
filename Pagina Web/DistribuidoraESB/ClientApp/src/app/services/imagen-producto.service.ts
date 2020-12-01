import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { ImagenProducto } from '../ESB/Models/imagen-producto';
import { tap, catchError } from 'rxjs/operators';
import { ImagenproductoView } from '../ESB/Models/imagenproducto-view';

@Injectable({
  providedIn: 'root'
})
export class ImagenProductoService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService)
   { 
      this.baseUrl = baseUrl;
    }
    post(imagenProducto: ImagenProducto): Observable<any>
    {
      console.log(imagenProducto);
      const fd =  new FormData();
      fd.append('image',imagenProducto.imagen,imagenProducto.imagen.name);
      fd.append('codigo', imagenProducto.codProducto);
      console.log(fd.get.name);
      return this.http.post(this.baseUrl + 'api/ImagenProducto',fd).pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError('Foto registrada',null))
        );
    }

    get(codigo: string): Observable<ImagenproductoView>
    {
      return this.http.get<ImagenproductoView>(this.baseUrl + 'api/ImagenProducto/'+codigo)
      .pipe(
        tap(_=> this.handleErrorService.handleError<ImagenproductoView>('Consulta de imagenes',null))  
      );
    }
}
