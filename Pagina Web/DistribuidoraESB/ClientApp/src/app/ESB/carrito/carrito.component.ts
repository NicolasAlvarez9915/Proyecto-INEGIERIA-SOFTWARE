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

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  usuario: Usuario;
  clienteConsuta: Cliente = new Cliente();
  pedidoSeleccionado: Pedido = new Pedido();
  estadoPedido: string = '';
  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  validarSesion() {
    this.authenticationService.currentUser.subscribe(x =>{
      this.usuario = x;
      if (this.usuario == null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "ALERTA.";
        messageBox.componentInstance.message = "Debe iniciar sesion para ver el carrito de compras.";
        this.router.navigate(['/Login']);
      } else {
        if (this.usuario.rol == "Administrador") {
          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "ALERTA.";
          messageBox.componentInstance.message = "Usted como administrador no registra los pedidos desde el carrito.";
        } else {
          this.buscaCliente();
        }
      }
    });
  }

  buscaCliente() {
    this.clienteService.buscar(this.usuario.idPersona).subscribe(r => {
      this.clienteConsuta = r;
    });
    this.generarPedido();
  }

  generarPedido() {
    this.pedidoService.generarPedido(this.clienteConsuta, this.pedidoService.obtenerCarrito()).subscribe(r => {
      this.pedidoSeleccionado = r;
    });
  }
  EliminarProducto(detalle: DetalleDePedido) {
    this.pedidoService.EliminarProductoDelCarrito(detalle.codProducto);
    this.generarPedido();
  }
  registrarPedido() {

    if (this.pedidoSeleccionado.detallesDePedidos.length == 0) {
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "ALERTA.";
      messageBox.componentInstance.message = "Debe ingresar productos a la factura.";
    } else {
      this.pedidoSeleccionado.idPersona = this.clienteConsuta.identificacion;
      this.pedidoService.registrarPedido(this.pedidoSeleccionado).subscribe(r => {
        if (r != null) {
          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "BIEN HECHO.";
          messageBox.componentInstance.message = "Pedido registrado correctamente.";
          this.pedidoService.EliminarCarrito();
          this.generarPedido();
        }
      })
    }
  }
}
