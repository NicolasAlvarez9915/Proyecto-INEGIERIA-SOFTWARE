import { Component, OnInit } from '@angular/core';
import {Usuario} from '../Models/usuario';
import {SecretariaService} from '../../services/secretaria.service';
import {AuthenticationService} from '../../services/authentication.service';
import {RutaService} from '../../services/ruta.service';
import {ModalService} from '../../compartido/servicios/modal.service';
import {Router} from '@angular/router';
import {Secretaria} from '../Models/secretaria';
import {Pedido} from '../Models/pedido';
import {PedidoService} from '../../services/pedido.service';
import {Domiciliario} from '../Models/domiciliario';
import {DomiciliarioService} from '../../services/domiciliario.service';
import {Cliente} from '../Models/cliente';
import {ClienteService} from '../../services/cliente.service';
import {Producto} from '../Models/producto';
import {ProductoService} from '../../services/producto.service';
import {DetalleDePedido} from '../Models/detalle-de-pedido';
import {Ruta} from '../Models/ruta';
import {Vehiculo} from '../Models/vehiculo';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons/faUserEdit';
import {faUserMinus} from '@fortawesome/free-solid-svg-icons/faUserMinus';

@Component({
  selector: 'app-perfil-secretaria',
  templateUrl: './perfil-secretaria.component.html',
  styleUrls: ['./perfil-secretaria.component.scss']
})
export class PerfilSecretariaComponent implements OnInit {

  usuario: Usuario
  rol: string;
  mostrar: string = 'Principal';
  secre: Secretaria;
  totalDomiciliariosSinRuta: number;
  pageDomiciliariosSinRuta = 1;
  pageSizeDomiciliariosSinRuta:number = 20;
  contrasena: string = "";
  contrasenaConfirmar: string = "";
  filtroClientes: string;
  totalClientes: number;
  pageTablaClientes = 1;
  pageSizeTablaClientes:number = 20;
  clienteConsuta: Cliente = new Cliente();
  pedidoGenrado: Pedido = new Pedido();
  productoSeleccionado: Producto = new Producto();
  codigoProducto: string;
  cantidadProducto: number;
  totalPedidos: number;
  pagePedidos = 1;
  filtroPedidos: string;
  pedidoSeleccionado: Pedido = new Pedido;
  pageSizePedidos:number = 20;
  estadoPedido: string;
  filtroPedidosSinRuta: string;
  filtroDomiciliariosSinruta: string;
  totalDomiciliarios: number;
  pageDomiciliarios = 1;
  pageSizeDomiciliarios:number = 20;
  filtroDomiciliario: string;
  domiciliarioSeleccionado: Domiciliario = new Domiciliario();
  rutaSeleccionada: Ruta = new Ruta();
  opcionTabblaDomiciliarios: string;
  userEdit = faUserEdit;
  userMinus =  faUserMinus;


  ListaPedidosSinruta: Pedido[] = [];
  check: boolean[] = [];
  ListaDomiciliariosSinRuta: Domiciliario[] = [];
  listaClientes: Cliente[] = [];
  listaProductoPedido: Array<Producto> = [];
  listaPedidos: Pedido[] = [];
  listaEstadosDisponiblePedido: string[] = [];
  LsitaDomiciliarios: Domiciliario[] = [];

  constructor(
    private router: Router,
    private secreService: SecretariaService,
    private authenticationService: AuthenticationService,
    private rutaService: RutaService,
    private modalService: ModalService,
    private pedidoService: PedidoService,
    private domiciliarioService: DomiciliarioService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.validarSesion();
    this.obtenerInfo();
    this.pedidosSinRuta();
    this.domiciliariosSinrRuta();
    this.domiciliarios();
    this.clientes();
    this.pedidos();
  }
  buscarRuta() {
    this.rutaService.rutaDomiciliario(this.domiciliarioSeleccionado.identificacion,false).subscribe(r => {
      this.rutaSeleccionada.pedidos = null;
      this.rutaSeleccionada = r.objeto;
    });
  }
  buscarMoto() {
    this.domiciliarioService.buscarVehiculo(this.domiciliarioSeleccionado.identificacion).subscribe(r => {
      this.domiciliarioSeleccionado.moto = new Vehiculo();
      this.domiciliarioSeleccionado.moto = r.objeto;
    });
  }
  domiciliarios() {
    this.domiciliarioService.Todos().subscribe(r => {
      this.LsitaDomiciliarios = r;
      this.sliceDomiciliarios();
    });
  }
  sliceDomiciliarios() {
    this.totalDomiciliarios = this.LsitaDomiciliarios.length;
    this.LsitaDomiciliarios = this.LsitaDomiciliarios.slice((this.pageDomiciliarios - 1) * this.pageSizeDomiciliarios, (this.pageDomiciliarios - 1) * this.pageSizeDomiciliarios + this.pageSizeDomiciliarios);
  }
  registrarRuta(domiciliario: Domiciliario) {
    let ruta: Ruta = new Ruta;
    ruta.codDomiciliario = domiciliario.identificacion;
    ruta.pedidos = [];
    for (let i = 0; i < this.ListaPedidosSinruta.length; i++) {
      if (this.check[i]) {
        ruta.pedidos.push(this.ListaPedidosSinruta[i]);
      }
    }
    this.rutaService.registrar(ruta).subscribe(r => {
      this.pedidosSinRuta();
      this.pedidos();
      this.domiciliariosSinrRuta();
      this.domiciliarios();
      this.modalService.openDialogInfo("BIEN HECHO","Pedidos asignados correctamente.");
      this.mostrar = "RegistrarRuta";
    });
  }
  actualizarPedido() {
    this.pedidoService.Actualizar(this.pedidoSeleccionado, this.estadoPedido).subscribe(r => {
      this.buscarPedido(this.pedidoSeleccionado.codigo);
    });
  }
  buscarPedido(codigo: string) {
    this.pedidoService.BuscarPedido(codigo).subscribe(r => {
      this.pedidoSeleccionado = r.objeto;
      this.validarEstadosDisponibles();
      this.clienteService.buscar(this.pedidoSeleccionado.idPersona).subscribe(r => {
        this.clienteConsuta = r.objeto;
      })
    })
  }
  validarEstadosDisponibles() {
    let estados = ["Bodega","En camino", "Entregado", "Pagado"];
    this.listaEstadosDisponiblePedido = [];
    let encontrado = false;
    estados.forEach(estado => {
      if(encontrado){
        this.listaEstadosDisponiblePedido.push(estado);
      }
      if(estado == this.pedidoSeleccionado.estado){
        encontrado = true;
      }
    })
  }
  EliminarProducto(detalle: DetalleDePedido) {
    for (let index = 0; index < this.listaProductoPedido.length; index++) {
      const element = this.listaProductoPedido[index];
      if (element.codigo === detalle.codProducto) {
        let producto = this.listaProductoPedido.indexOf(element);
        if (producto !== -1) {
          this.listaProductoPedido.splice(producto, 1);
        }
      }
    }
    this.generarPedido();
  }
  AgregarProducto() {
    if (this.productoSeleccionado.cantidad == undefined) {
      this.modalService.openDialogInfo("ALERTA.", "Debe buscar un producto.", 2);
    } else {
      this.productoSeleccionado.cantidad = this.cantidadProducto;
      this.listaProductoPedido.unshift(this.productoSeleccionado);
      this.generarPedido();
      this.resetearProductoSeleccionado();
    }
  }
  registrarPedido() {
    if (this.pedidoGenrado.detallesDePedidos == null) {
      this.modalService.openDialogInfo("ALERTA", "Debe ingresar productos al pedido", 2);
    } else {
      this.pedidoService.registrarPedido(this.pedidoGenrado).subscribe(r => {
        this.modalService.openDialogInfo("BIEN HECHO", "Pedido registrado correctamente");
        this.listaProductoPedido = [];
        this.productoSeleccionado = new Producto();
        this.pedidos();
      })
    }
  }
  BuscarProducto() {
    this.productoService.buscar(this.codigoProducto).subscribe(r => {
      this.productoSeleccionado = r.objeto;
    })
  }
  pedidos() {
    this.pedidoService.todos().subscribe(r => {
      this.listaPedidos = r;
      this.slicePedidos();
    });
  }
  slicePedidos(){
    this.totalPedidos = this.listaPedidos.length;
    this.listaPedidos = this.listaPedidos.slice((this.pagePedidos - 1) * this.pageSizePedidos, (this.pagePedidos - 1) * this.pageSizePedidos + this.pageSizePedidos);
  }
  generarPedido() {
    this.pedidoService.generarPedido(this.clienteConsuta, this.listaProductoPedido).subscribe(r => {
      this.pedidoGenrado = r.objeto;
    })
  }
  resetearProductoSeleccionado() {
    this.productoSeleccionado = new Producto();
    this.codigoProducto = '';
    this.cantidadProducto = 1;
  }

  clientes() {
    this.clienteService.Todos().subscribe
    (
      r => {
        this.listaClientes = r;
        this.sliceClientes()
      }
    )
  }
  sliceClientes() {
    this.totalClientes = this.listaClientes.length;
    this.listaClientes = this.listaClientes.slice((this.pageTablaClientes - 1) * this.pageSizeTablaClientes, (this.pageTablaClientes - 1) * this.pageSizeTablaClientes + this.pageSizeTablaClientes);
  }
  domiciliariosSinrRuta() {
    this.domiciliarioService.sinRuta().subscribe(r => {
      this.ListaDomiciliariosSinRuta = r;
      this.sliceDomiciliariosSinRuta();
    });
  }
  sliceDomiciliariosSinRuta() {
    this.totalDomiciliariosSinRuta = this.ListaDomiciliariosSinRuta.length;
    this.ListaDomiciliariosSinRuta = this.ListaDomiciliariosSinRuta.slice((this.pageDomiciliariosSinRuta - 1) * this.pageSizeDomiciliariosSinRuta, (this.pageDomiciliariosSinRuta - 1) * this.pageSizeDomiciliariosSinRuta + this.pageSizeDomiciliariosSinRuta);
  }
  pedidosSinRuta() {
    this.pedidoService.SinRuta().subscribe(r => {
      this.ListaPedidosSinruta = r;
      this.ListaPedidosSinruta.forEach(element => {
        this.check.push(element == null);
      });
    });
  }
  validarSesion() {
    this.authenticationService.currentUser.subscribe(x => {
      this.usuario = x;
      if (this.usuario == null) {
        this.router.navigate(['/Login']);
      } else {
        this.rol = this.usuario.rol;
      }
    });
  }

  obtenerInfo(){
    this.secreService.buscar(this.usuario.idPersona).subscribe(secre =>{
      if(secre != null){
        this.secre = secre.objeto;
      }
    })
  }
}
