import { Component, OnInit } from '@angular/core';
import { ImagenproductoView } from '../ESB/Models/imagenproducto-view';
import { Producto } from '../ESB/Models/producto';
import { ImagenProductoService } from '../services/imagen-producto.service';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/producto.service';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {


  productosRegistrardos: Producto[] = [];
  imagenProductoViews: ImagenproductoView[] = [];
  cantidadProducto: number[] = [];
  constructor(
    private productoService: ProductoService,
    private imagenService: ImagenProductoService,
    private pedidoService: PedidoService,
    private signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    this.productos();
    this.Imagenes();
    this.signalRService.productoReceived.subscribe((producto: Producto) => {
      this.productosRegistrardos.push(producto);
    });
    this.signalRService.imagenReceived.subscribe((imagen: ImagenproductoView) => {
      this.imagenProductoViews.push(imagen)
      this.cantidadProducto.push(0);
    });
  }


  productos() {
    this.productoService.todos().subscribe(r => {
      this.productosRegistrardos = r;
      this.productosRegistrardos.forEach(e => {
        this.cantidadProducto.push(0);
      });
    });
  }

  Imagenes() {
    this.imagenService.Todos().subscribe(r => {
      this.imagenProductoViews = r;
    });
  }

  anadirProductoAlCarro(posicion: number) {
    let productoAAgregar: Producto = this.productosRegistrardos[posicion];
    productoAAgregar.cantidad = this.cantidadProducto[posicion];

    if (productoAAgregar.cantidad != 0) {
      this.pedidoService.AnadirProductoAlCarro(productoAAgregar);
    }
    this.cantidadProducto[posicion] = 0;
  }
}
