import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleHttpErrorService} from '../@base/handle-http-error.service';
import {Usuario} from '../ESB/Models/usuario';
import {Observable} from 'rxjs';
import {Respuesta} from '../models/respuesta';
import {catchError} from 'rxjs/operators';
import {Secretaria} from '../ESB/Models/secretaria';
import {Cliente} from '../ESB/Models/cliente';
import {Producto} from '../ESB/Models/producto';

@Injectable({
  providedIn: 'root'
})
export class SecretariaService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService)
  {
    this.baseUrl = baseUrl;
  }
  post(secretaria: Secretaria, usuario: Usuario): Observable<Respuesta<Secretaria>>
  {
    return this.http.post<Respuesta<Secretaria>>(this.baseUrl+'api/CrearPersona/RegistrarSecretario',{secretaria, usuario}).pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Secretaria>>('Fallo al registrar la secretaria.',null))
    );
  }

  Todos(): Observable<Secretaria[]>
  {
    return this.http.get<Secretaria[]>(this.baseUrl+'api/Secretaria/Todos').pipe(
      catchError(this.handleErrorService.handleError<Secretaria[]>('Fallo al buscar todos los secretarios', null))
    )
  }

  buscar(identificacion: string): Observable<Respuesta<Secretaria>>
  {
    return this.http.get<Respuesta<Secretaria>>(this.baseUrl+'api/Secretaria/Secretario/'+identificacion).pipe(
      catchError(this.handleErrorService.handleError<Respuesta<Secretaria>>('Fallo al buscar al secretario.',null))
    );
  }

}
