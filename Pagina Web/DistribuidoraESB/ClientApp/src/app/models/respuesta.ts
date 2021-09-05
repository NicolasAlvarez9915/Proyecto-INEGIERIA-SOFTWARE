export class Respuesta<T> {
  codigoHttp: number;
  error: boolean;
  mensaje: string;
  objeto: T;
}
