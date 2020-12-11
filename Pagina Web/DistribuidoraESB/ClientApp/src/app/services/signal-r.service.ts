import { Injectable, Inject, EventEmitter } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ImagenproductoView } from '../ESB/Models/imagenproducto-view';
import { Pedido } from '../ESB/Models/pedido';
import { Producto } from '../ESB/Models/producto';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  private hubConnection: signalR.HubConnection;
  productoReceived = new EventEmitter<Producto>();
  imagenReceived = new EventEmitter<ImagenproductoView>();
  pedidoReceived = new EventEmitter<Pedido>();
  baseUrl: string;

  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.buildConnection();
    this.startConnection();
  }

  private buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + "signalHub") //use your api adress here and make sure you use right hub name.
      .build();
  };

  private startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection Started...");
        this.registerSignalEvents();
      })
      .catch(err => {
        console.log("Error while starting connection: " + err);

        //if you get error try to start connection again after 3 seconds.
        setTimeout(function () {
          this.startConnection();
        }, 3000);
      });
  };

  registerSignalEvents() {
    this.hubConnection.on("RegistrarProducto", (data: Producto) => {
      this.productoReceived.emit(data);
    });
    this.hubConnection.on("RegistrarImagen", (data: ImagenproductoView) => {
      this.imagenReceived.emit(data);
    });
    this.hubConnection.on("RegistrarPedido", (data: Pedido) => {
      this.pedidoReceived.emit(data);
    });
  }
}
