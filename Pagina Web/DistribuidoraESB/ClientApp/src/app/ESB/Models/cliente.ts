import { Descuento } from "./descuento";

export class Cliente {
    direccion: string
    horaio: string;
    identificacion: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    whatsapp: string;
    tipoCliente: string;
    descuentos: Descuento[];    
}
