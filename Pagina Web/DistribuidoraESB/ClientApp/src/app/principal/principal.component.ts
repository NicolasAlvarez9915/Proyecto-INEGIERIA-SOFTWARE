import {Component, Inject, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../@base/alert-modal/alert-modal.component';
import { Producto } from '../ESB/Models/producto';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/producto.service';
import { SignalRService } from '../services/signal-r.service';
import {ProductoByCategoria} from '../ESB/Models/producto-by-categoria';
import {ProductoComponent} from './componentes/producto/producto.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  urlImagenes = [];
  productosRegistrardos: ProductoByCategoria;
  baseUrl: string;
  constructor(
    public dialog: MatDialog,
    @Inject('BASE_URL') baseUrl: string,
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private signalRService: SignalRService,
    private modalService: NgbModal
  ) {
    this.baseUrl = baseUrl;
    this.urlImagenes = [1,2,3,4,5,6].map((n)=> this.baseUrl+"imagenes/imagenesSistema/carrusel/1 ("+n+").jpg");
  }

  ngOnInit(): void {
    this.productos();
    this.signalRService.productoReceived.subscribe((producto: Producto) => {
      switch (producto.categoria)
      {
        case "Pollo":
          this.productosRegistrardos.pollo.push(producto);
          break;
        case "Carne de res":
          this.productosRegistrardos.carneRes.push(producto);
          break;
        case "Carne de cerdo":
          this.productosRegistrardos.carneCerdo.push(producto);
          break;
      }
    });
  }


  productos() {
    this.productoService.ByCategoria().subscribe(r => {
      this.productosRegistrardos = r.objeto;
    });
  }

  ComprarProducto(producto: Producto)
  {
    let referenciaModal = this.dialog.open(ProductoComponent, {
      data: producto
    });
    return referenciaModal.afterClosed().subscribe(
      respuesta =>{
        this.productos();
      }
    );
  }
}
