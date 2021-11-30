import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Cliente } from '../Models/cliente';
import { DetalleDePedido } from '../Models/detalle-de-pedido';
import { Pedido } from '../Models/pedido';
import { Producto } from '../Models/producto';
import { Usuario } from '../Models/usuario';
import {ModalService} from "../../compartido/servicios/modal.service";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  usuario: Usuario;
  clienteConsuta: Cliente = new Cliente();
  pedidoSeleccionado: Pedido = new Pedido();
  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private modalMaterialService: ModalService
  ) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(usuario =>{
      this.usuario = usuario;
      this.buscaCliente();
    });
  }

  buscaCliente() {
    this.clienteService.buscar(this.usuario.idPersona).subscribe(respuesta => {
      if(!respuesta.error)
      {
        this.clienteConsuta = respuesta.objeto;
        this.generarPedido();
      }
    });
  }

  generarPedido() {
    this.pedidoService.generarPedido(this.clienteConsuta, this.pedidoService.obtenerCarrito()).subscribe(respuesta => {
      if(!respuesta.error)
      {
        this.pedidoSeleccionado = respuesta.objeto;
      }
    });
  }
  EliminarProducto(detalle: DetalleDePedido) {
    this.pedidoService.EliminarProductoDelCarrito(detalle.codProducto);
    this.generarPedido();
  }
  registrarPedido() {
    if (this.pedidoSeleccionado.detallesDePedidos.length == 0) {
      this.modalMaterialService.openDialogInfo("ALERTA.","Debe ingresar productos al pedido.",2);
    } else {
      this.pedidoSeleccionado.idPersona = this.clienteConsuta.identificacion;
      this.pedidoService.registrarPedido(this.pedidoSeleccionado).subscribe(respuesta => {
        this.modalMaterialService.openDialogInfo("BIEN HECHO.","Pedido registrado correctamente.");
          this.pedidoService.EliminarCarrito();
          this.generarPedido();
      })
    }
  }
}
