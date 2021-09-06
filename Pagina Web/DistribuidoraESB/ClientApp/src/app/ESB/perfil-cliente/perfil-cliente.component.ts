import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DescuentoService } from 'src/app/services/descuento.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { SignalRService } from 'src/app/services/signal-r.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Cliente } from '../Models/cliente';
import { Descuento } from '../Models/descuento';
import { Pedido } from '../Models/pedido';
import { Usuario } from '../Models/usuario';
import {AlertModalComponent} from '../../@base/alert-modal/alert-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  usuario: Usuario;
  cliente: Cliente = new Cliente();
  activa: boolean = false;
  mostrar: string = 'Principal';
  filtroPedidos: string;
  listaPedidosEntregados: Pedido[] = [];
  lsitaPedidosEnProceso: Pedido[] = [];

  listaDescuentos: Descuento[] = [];

  pedidoSeleccionado: Pedido = new Pedido();
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private descuentoService: DescuentoService,
    private authenticationService: AuthenticationService,
    private signalRService: SignalRService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.validarSesion();
    this.signalRService.pedidoReceived.subscribe((pedido: Pedido) => {
      if (pedido.idPersona == this.cliente.identificacion) {
        this.lsitaPedidosEnProceso.push(pedido);
      }
    });
  }

  mostrarDescuentosCliente() {
    this.descuentoService.DescuentosPorCliente(this.cliente.identificacion).subscribe(r => {
      this.listaDescuentos = r;
    });
  }

  pedirInforCliente() {
    this.clienteService.buscar(this.usuario.idPersona).subscribe(
      r => {
        this.cliente = r.objeto;
        this.mostrarDescuentosCliente();
        this.PedidosEnProcesoCliente();
        this.PedidosEntregadosCliente();
      },
      error =>{
        this.alertaRespuestaError(error);
      }
    )
  }

  validarSesion() {
    this.authenticationService.currentUser.subscribe(x => {
      this.usuario = x;
      if (this.usuario == null) {
        this.router.navigate(['/Login']);
      } else {
        if(this.usuario.rol == "Cliente"){
          this.pedirInforCliente();
        }
      }
    });
  }

  buscarPedido(codigo: string) {
    this.pedidoService.BuscarPedido(codigo).subscribe(r => {
      this.pedidoSeleccionado = r;
    })
  }

  PedidosEntregadosCliente() {
    this.pedidoService.PedidosEntregadosCliente(this.cliente.identificacion).subscribe(r => {
      this.listaPedidosEntregados = r;
    });
  }

  PedidosEnProcesoCliente() {
    this.pedidoService.PedidosEnProcesoCliente(this.cliente.identificacion).subscribe(r => {
      this.lsitaPedidosEnProceso = r;
    });
  }

  alertaRespuestaError(error){
    const messageBox = this.modalService.open(AlertModalComponent)
    messageBox.componentInstance.title = "ALERTA.";
    messageBox.componentInstance.message = error.error.mensaje;
  }

}
