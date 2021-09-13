import { Vehiculo } from "./vehiculo"

export class Domiciliario {
  fechaPermisoConduccion: Date;
  moto: Vehiculo = new Vehiculo();
  identificacion: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  whatsapp: string;
}
