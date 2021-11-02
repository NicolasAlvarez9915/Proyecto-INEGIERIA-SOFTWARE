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
import {ModalService} from '../../compartido/servicios/modal.service';
import {faUserMinus} from '@fortawesome/free-solid-svg-icons/faUserMinus';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {
  faEliminar = faUserMinus;
  panelOpenState = false;

  totalPedidos: number;
  pagePedidos = 1;
  pageSizePedidos:number = 20;

  totalPedidosEntregados: number;
  pagePedidosEntregados = 1;
  pageSizePedidosEntregados:number = 20;

  pageDescuentosRegistrados = 1;
  pageSizeDescuentosRegistrados:number = 20;
  totalDescuentosRegitrados: number;

  usuario: Usuario;
  cliente: Cliente = new Cliente();
  activa: boolean = false;
  mostrar: string = 'Principal';
  filtroPedidos: string;
  listaPedidosEntregados: Pedido[] = [];
  lsitaPedidosEnProceso: Pedido[] = [];

  clienteActualizar: Cliente = new Cliente();
  contrasena: string = "";
  contrasenaConfirmar: string = "";


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
    private modalService: NgbModal,
    private modalMaterialService: ModalService
  ) { }

  ngOnInit(): void {
    this.validarSesion();
    this.signalRService.pedidoReceived.subscribe((pedido: Pedido) => {
      if (pedido.idPersona == this.cliente.identificacion) {
        this.lsitaPedidosEnProceso.push(pedido);
      }
    });
  }

  eliminarCuenta(){
    this.modalMaterialService.openDialogDesicion("Eliminar cuenta", "¿Esta seguro?").subscribe( result =>{
        if(result){
          this.clienteService.eliminarCliente(this.cliente.identificacion).subscribe(
            result =>{
              if(!result.error)
              {
                this.modalMaterialService.openDialogInfo("Cuenta eliminada satisfactoriamente", "Sera redireccionado fuera del aplciativo");
                this.authenticationService.logout();
                this.router.navigate(["/Login"])
              }
            }
          )
        }
      }
    )
  }
  actualizarInfo(){
    this.modalMaterialService.openDialogDesicion("Actualizar información.","¿Esta seguro?").subscribe(result =>{
      if(result){
        this.clienteService.Actualizar(this.cliente).subscribe(
          respuesta =>{
            if(this.validarActualizarContrasena())
            {
              this.usuario.contraseña = this.contrasena;
              this.usuarioService.actualizarContraseña(this.usuario).subscribe(
                respuesta => {
                  this.usuario.contraseña = null;
                  this.modalMaterialService.openDialogInfo("Actualizar contraseña", "Contraseña actualizada correctamente.");
                }
              )
            }
            this.modalMaterialService.openDialogInfo("Actualizar información", "información actualizada correctamente.");
          }
        )

      }
    })
  }

  validarActualizarContrasena(): boolean
  {
    let acumulado = 0;
    if(this.validarDatoVacio(this.contrasena))
    {
      acumulado++;
    }
    if(this.validarDatoVacio(this.contrasenaConfirmar))
    {
      acumulado++;
    }
    if(acumulado != 2 && acumulado != 0)
    {
      this.modalMaterialService.openDialogInfo("Actualizar contraseña", "Para actualizar la contraseña ingresar la contraseña nueva y su confirmacion.",2);
      return false;
    }
    if(this.contrasena != this.contrasenaConfirmar)
    {
      acumulado++;
      this.modalMaterialService.openDialogInfo("Actualizar contraseña", "Las contraseñas no coinsiden.",2);
      return false;
    }
    return acumulado != 0;

  }

  validarDatoVacio(Dato: string)
  {
    return (Dato != undefined && Dato != "")
  }
  mostrarDescuentosCliente() {
    this.descuentoService.DescuentosPorCliente(this.cliente.identificacion).subscribe(r => {
      this.listaDescuentos = r;
      this.sliceDescuentosRegistrados();
    });
  }
  sliceDescuentosRegistrados()
  {
    this.totalDescuentosRegitrados = this.listaDescuentos.length;
    this.listaDescuentos = this.listaDescuentos.slice((this.pageDescuentosRegistrados - 1) * this.pageSizeDescuentosRegistrados, (this.pageDescuentosRegistrados - 1) * this.pageSizeDescuentosRegistrados + this.pageSizeDescuentosRegistrados);
  }

  pedirInforCliente() {
    this.clienteService.buscar(this.usuario.idPersona).subscribe(
      r => {
        this.cliente = r.objeto;
        this.mostrarDescuentosCliente();
        this.PedidosEnProcesoCliente();
        this.PedidosEntregadosCliente();
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
      this.pedidoSeleccionado = r.objeto;
    })
  }

  PedidosEntregadosCliente() {
    this.pedidoService.PedidosEntregadosCliente(this.cliente.identificacion).subscribe(r => {
      this.listaPedidosEntregados = r;
      this.slicePedidos();
    });
  }

  slicePedidos()
  {
    this.totalPedidos = this.listaPedidosEntregados.length;
    this.listaPedidosEntregados = this.listaPedidosEntregados.slice((this.pagePedidos - 1) * this.pageSizePedidos, (this.pagePedidos - 1) * this.pageSizePedidos + this.pageSizePedidos);
  }

  PedidosEnProcesoCliente() {
    this.pedidoService.PedidosEnProcesoCliente(this.cliente.identificacion).subscribe(r => {
      this.lsitaPedidosEnProceso = r;
      this.slicePedidosProcesos();
    });
  }

  slicePedidosProcesos()
  {
    this.totalPedidosEntregados = this.lsitaPedidosEnProceso.length;
    this.listaPedidosEntregados = this.lsitaPedidosEnProceso.slice((this.pagePedidosEntregados - 1) * this.pageSizePedidosEntregados, (this.pagePedidosEntregados - 1) * this.pageSizePedidosEntregados + this.pageSizePedidosEntregados);
  }

  alertaRespuestaError(error){
    const messageBox = this.modalService.open(AlertModalComponent)
    messageBox.componentInstance.title = "ALERTA.";
    messageBox.componentInstance.message = error.error.mensaje;
  }

}
