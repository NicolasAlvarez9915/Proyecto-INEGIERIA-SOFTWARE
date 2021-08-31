import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../@base/alert-modal/alert-modal.component';
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
    private signalRService: SignalRService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.productos();
    this.signalRService.productoReceived.subscribe((producto: Producto) => {
      this.productosRegistrardos.push(producto);
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
    if (this.cantidadProducto[posicion] <= this.productosRegistrardos[posicion].cantidad) {
      let productoAAgregar: Producto = this.productosRegistrardos[posicion];
      productoAAgregar.cantidad = this.cantidadProducto[posicion];

      if (productoAAgregar.cantidad > 0) {
        this.pedidoService.AnadirProductoAlCarro(productoAAgregar);
      } else {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "ALERTA";
        messageBox.componentInstance.message = "La cantidad que intenta comprar es invalida, utilice cantidadess positiva.";
      }
      this.cantidadProducto[posicion] = 0;
    } else {
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "ALERTA";
      messageBox.componentInstance.message = "La cantidad que intenta comprar excede la actual: " + this.productosRegistrardos[posicion].cantidad;
    }
  }
}
