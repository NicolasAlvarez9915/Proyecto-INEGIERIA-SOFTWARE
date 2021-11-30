import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { AdministradorService } from 'src/app/services/administrador.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DescuentoService } from 'src/app/services/descuento.service';
import { DomiciliarioService } from 'src/app/services/domiciliario.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import { RutaService } from 'src/app/services/ruta.service';
import { SignalRService } from 'src/app/services/signal-r.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Administrador } from '../Models/administrador';
import { Cliente } from '../Models/cliente';
import { Descuento } from '../Models/descuento';
import { DetalleDePedido } from '../Models/detalle-de-pedido';
import { Domiciliario } from '../Models/domiciliario';
import { Pedido } from '../Models/pedido';
import { Producto } from '../Models/producto';
import { Ruta } from '../Models/ruta';
import { Usuario } from '../Models/usuario';
import { Vehiculo } from '../Models/vehiculo';
import {first} from "rxjs/operators";
import {faUserMinus} from '@fortawesome/free-solid-svg-icons/faUserMinus';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons/faUserEdit';
import {ModalService} from '../../compartido/servicios/modal.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  page = 1;
  pageSize:number = 20;
  pageTablaClientes = 1;
  pageSizeTablaClientes:number = 20;
  pageDescuentosRegistrados = 1;
  pageSizeDescuentosRegistrados:number = 20;
  totalDescuentosRegitrados: number;
  pageDescuentosNuevos = 1;
  pageSizeDescuentosNuevos:number = 20;
  totalDescuentosNuevos: number;
  pagePedidos = 1;
  pageSizePedidos:number = 20;
  totalPedidos: number;
  pageDomiciliarios = 1;
  pageSizeDomiciliarios:number = 20;
  totalDomiciliarios: number;
  pageDomiciliariosSinRuta = 1;
  pageSizeDomiciliariosSinRuta:number = 20;
  totalDomiciliariosSinRuta: number;
  pagePedidosSinRuta = 1;
  pageSizePedidosSinRuta:number = 20;
  totalPedidosSinRuta: number;
  pageProductosStock = 1;
  pageSizeProductosStock:number = 20;
  totalProductosStock: number;


  userEdit = faUserEdit;
  userMinus =  faUserMinus;
  baseUrl: string;
  formularioRegistroCliente: FormGroup;
  formularioregistroProducto: FormGroup;
  formularioregistroDomiciliario: FormGroup;

  usuario: Usuario;
  administrador: Administrador;
  administradorActualizar: Administrador;
  contrasenaActualizar: string;
  contrasenaconfirmar: string;
  clienteRegistrar: Cliente;
  clienteConsuta: Cliente = new Cliente();
  usuarioRegistrar: Usuario;
  codigoProducto: string;
  productoSeleccionado: Producto = new Producto();
  cantidadProducto: number;
  estadoPedido: string;
  domiciliario: Domiciliario;
  vehiculo: Vehiculo;
  imagenRegistrar: File;

  listaClientes: Cliente[] = [];
  totalClientes: number;
  listaProductos: Producto[] = [];
  totalProductos: number;
  listaDescuentos: Descuento[] = [];
  listaProductosSinDescuento: Producto[] = [];
  listaDescuentosNuevos: Descuento[] = [];
  listaDescuentosARegistrar: Descuento[] = [];
  listaPedidos: Pedido[] = [];
  listaProductoPedido: Array<Producto> = [];
  LsitaDomiciliarios: Domiciliario[] = [];
  ListaDomiciliariosSinRuta: Domiciliario[] = [];
  ListaPedidosSinruta: Pedido[] = [];
  pedidoGenrado: Pedido = new Pedido();
  listaEstadosDisponiblePedido: string[] = [];

  productoConsulta: Producto = new Producto;

  opcionTabbla: string = "ver";

  descuentoNuevo: Descuento;
  descuentoParaTodos: number = 0;
  filtroClientes: string;
  filtroProductos: string;
  filtroProductosStock: string;
  filtroPedidos: string;
  filtroDomiciliario: string;
  filtroDomiciliariosSinruta: string;
  filtroPedidosSinRuta: string;
  i: number;
  existe: Boolean;
  Rol: string;
  producto: Producto;
  mostrar: string;
  mostrarInterno: string;
  mostrarOpsInterno: string;
  activa: boolean = false;
  domiciliarioSeleccionado: Domiciliario = new Domiciliario();

  opcionTabblaDomiciliarios: string;

  check: boolean[] = [];

  pedidoSeleccionado: Pedido = new Pedido;

  selectedFile: string | ArrayBuffer;

  pocasCantidades: Producto[]=[];

  rutaSeleccionada: Ruta = new Ruta();

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private administradorService: AdministradorService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private descuentoService: DescuentoService,
    private domiciliarioService: DomiciliarioService,
    private rutaService: RutaService,
    private authenticationService: AuthenticationService,
    private signalRService: SignalRService,
    private modalMaterialService: ModalService,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
    this.administradorActualizar = new Administrador();
  }

  ngOnInit(): void {
    this.administrador = new Administrador();
    this.listaDescuentosNuevos = [];
    this.listaDescuentosARegistrar = [];
    this.validarSesion();
    this.buildForm();
    this.pedirInforAdministrador();
    this.clientes();
    this.productos();
    this.pedidos();
    this.mostrar = 'Principal';
    this.mostrarInterno = 'Principal';
    this.resetearProductoSeleccionado();
    this.buildFormDomiciliario();
    this.domiciliarios();
    this.pedidosSinRuta();
    this.productosPocasCAntidades();
    this.domiciliariosSinrRuta();
    this.rutaSeleccionada.pedidos = [];
    this.domiciliarioSeleccionado.moto = new Vehiculo();
    this.signalRService.pedidoReceived.subscribe((pedido: Pedido) => {
      this.listaPedidos.push(pedido);
    });
    this.signalRService.productoReceived.subscribe((producto: Producto) => {
      this.listaProductos.push(producto);
      this.totalProductos++;
    });
  }
  eliminarCuentaCliente(){
    this.modalMaterialService.openDialogDesicion("Eliminar cuenta", "¿Esta seguro?").subscribe( result =>{
        if(result){
          this.clienteService.eliminarCliente(this.clienteConsuta.identificacion).subscribe(
            result =>{
              if(!result.error)
              {
                this.modalMaterialService.openDialogInfo("Cuenta eliminada satisfactoriamente", "Paso a un estado de inactividad");
                this.clientes();
              }
            }
          )
        }
      }
    )
  }
  eliminarCuentaDomiciliario(){
    this.modalMaterialService.openDialogDesicion("Eliminar cuenta", "¿Esta seguro?").subscribe( result =>{
        if(result){
          this.domiciliarioService.eliminarDomiciliario(this.domiciliarioSeleccionado.identificacion).subscribe(
            result =>{
              if(!result.error)
              {
                this.modalMaterialService.openDialogInfo("Cuenta eliminada satisfactoriamente", "Paso a un estado de inactividad");
                this.clientes();
              }
            }
          )
        }
      }
    )
  }
  reiniciarFormularios(){
    this.buildFormDomiciliario();
    this.buildForm();
  }
  buscarRuta() {
    this.rutaService.rutaDomiciliario(this.domiciliarioSeleccionado.identificacion,false).subscribe(r => {
      this.rutaSeleccionada.pedidos = null;
        this.rutaSeleccionada = r.objeto;
    });
  }
  productosPocasCAntidades() {
    this.productoService.PocasCantidades().subscribe(r => {
      this.pocasCantidades = r;
      this.sliceProductosStock();
    });
  }
  sliceProductosStock() {
    this.totalProductosStock = this.pocasCantidades.length;
    this.pocasCantidades = this.pocasCantidades.slice((this.pageProductosStock - 1) * this.pageSizeProductosStock, (this.pageProductosStock - 1) * this.pageSizeProductosStock + this.pageSizeProductosStock);
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
        this.modalMaterialService.openDialogInfo("BIEN HECHO","Pedidos asignados correctamente.");
        this.mostrar = "RegistrarRuta";
    });
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
  private buildFormDomiciliario() {
    this.domiciliario = new Domiciliario();
    this.domiciliario.moto = new Vehiculo();
    this.usuarioRegistrar = new Usuario();

    this.domiciliario.apellidos = '';
    this.domiciliario.fechaPermisoConduccion = new Date();
    this.domiciliario.identificacion = '';
    this.domiciliario.nombres = '';
    this.domiciliario.telefono = '';
    this.domiciliario.whatsapp = '';

    this.domiciliario.moto.fechaSoat = new Date();
    this.domiciliario.moto.fechaTecnoMecanica = new Date();
    this.domiciliario.moto.placa = '';

    this.usuarioRegistrar.correo = '';
    this.contrasenaActualizar = '';
    this.contrasenaconfirmar = '';

    this.formularioregistroDomiciliario = this.formBuilder.group({
      apellidos: [this.domiciliario.apellidos, Validators.required],
      fechaPermisoConduccion: [this.domiciliario.fechaPermisoConduccion, Validators.required],
      identificacion: [this.domiciliario.identificacion, Validators.required],
      nombres: [this.domiciliario.nombres, Validators.required],
      telefono: [this.domiciliario.telefono, Validators.required],
      whatsapp: [this.domiciliario.whatsapp, Validators.required],
      fechaSoat: [this.domiciliario.moto.fechaSoat, Validators.required],
      fechaTecnoMecanica: [this.domiciliario.moto.fechaTecnoMecanica, Validators.required],
      placa: [this.domiciliario.moto.placa, Validators.required],
      correo: [this.usuarioRegistrar.correo, Validators.required],
      contrasena: [this.contrasenaActualizar, Validators.required],
      contrasenaConfirmar: [this.contrasenaconfirmar, Validators.required]
    });
  }
  reiniciarListaDescuentos(){
    this.listaDescuentos = [];
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
  get controlDomiciliario() {
    return this.formularioregistroDomiciliario.controls
  }
  onSubmitDomiciliario() {
    if (this.formularioregistroDomiciliario.invalid) {
      return;
    }
    this.registrarDomiciliario();
  }
  registrarDomiciliario() {
    this.llenarObjetos();
    if (this.formularioregistroDomiciliario.value.contrasena != this.formularioregistroDomiciliario.value.contrasenaConfirmar) {
      this.modalMaterialService.openDialogInfo("ALERTA","Las contraseñas no coinciden",2);
    } else {
      this.crearDomiciliario();
    }
  }
  crearDomiciliario(){
    this.usuarioRegistrar.contraseña = this.formularioregistroDomiciliario.value.contrasena;
    this.domiciliarioService.registrar(this.domiciliario, this.usuarioRegistrar).subscribe(d => {
        if(!d.error)
        {
          this.modalMaterialService.openDialogInfo("BIEN HECHO","Domiciliario registrado, cuenta creada exitosamente");
          this.domiciliariosSinrRuta();
          this.domiciliarios();
        }
    });
  }
  llenarObjetos() {
    this.domiciliario = this.formularioregistroDomiciliario.value;
    this.vehiculo = new Vehiculo();
    this.vehiculo.fechaSoat = this.formularioregistroDomiciliario.value.fechaSoat;
    this.vehiculo.fechaTecnoMecanica = this.formularioregistroDomiciliario.value.fechaTecnoMecanica;
    this.vehiculo.placa = this.formularioregistroDomiciliario.value.placa;
    this.vehiculo.idDomiciliario = this.domiciliario.identificacion;
    this.domiciliario.moto = this.vehiculo;
    this.usuarioRegistrar = new Usuario();
    this.usuarioRegistrar.contraseña = this.formularioregistroDomiciliario.value.contrasenaActualizar;
    this.usuarioRegistrar.correo = this.formularioregistroDomiciliario.value.correo;
    this.usuarioRegistrar.idPersona = this.domiciliario.identificacion;
    this.usuarioRegistrar.rol = "Domiciliario";
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
  onPhotoSelected(evento): void {
    const archivo: File = evento.target.files[0];
    if (!archivo) {
      return;
    }
    this.imagenRegistrar = archivo;
    const reader = new FileReader();
    reader.onload = e => this.selectedFile = reader.result;
    reader.readAsDataURL(this.imagenRegistrar);
    evento.target.value = "";
  }
  abastecer() {
    if (this.productoSeleccionado.cantidad == undefined) {
      this.modalMaterialService.openDialogInfo("ALERTA", "Debe buscar un prducto", 2);
    } else {
      this.productoSeleccionado.cantidad = this.cantidadProducto;
      this.productoService.Abastecer(this.productoSeleccionado).subscribe(
        r => {
          this.productoSeleccionado = r.objeto;
        }
      )
      this.resetearProductoSeleccionado();
    }
  }
  AgregarProducto() {
    if (this.productoSeleccionado.cantidad == undefined) {
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "ALERTA.";
      messageBox.componentInstance.message = "Debe buscar un producto.";
    } else {
      this.productoSeleccionado.cantidad = this.cantidadProducto;
      this.listaProductoPedido.unshift(this.productoSeleccionado);
      this.generarPedido();
      this.resetearProductoSeleccionado();
    }
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
  registrarPedido() {
    if (this.pedidoGenrado.detallesDePedidos == null) {
      this.modalMaterialService.openDialogInfo("ALERTA", "Debe ingresar productos al pedido", 2);
    } else {
      this.pedidoService.registrarPedido(this.pedidoGenrado).subscribe(r => {
        this.modalMaterialService.openDialogInfo("BIEN HECHO", "Pedido registrado correctamente");
          this.listaProductoPedido = [];
          this.productoSeleccionado = new Producto();
          this.pedidos();
      })
    }
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
  SelccionarProductosPedido(cliente: Cliente) {
    this.clienteConsuta = cliente;
    this.mostrar = 'SelccionarProductosPedido';
  }
  aplicarATodosUnDescuento() {
    this.listaDescuentosNuevos.forEach(descuento => {
      descuento.porcentaje = this.descuentoParaTodos;
    });
  }
  registrarDescuentos() {
    this.listaDescuentosARegistrar = [];
    this.listaDescuentosNuevos.forEach(descuento => {
      if (descuento.porcentaje > 0) {
        this.listaDescuentosARegistrar.push(descuento);
      }
    });
    this.descuentoService.registrarDescuentos(this.listaDescuentosARegistrar).subscribe(r => {
      this.modalMaterialService.openDialogInfo("BIEN HECHO.","Descuentos registrados correctamente.");
        this.productosSindescuento();
    },
      respuesta => {
      this.alertaRespuestaError(respuesta);
    })
  }
  mostrarDescuentosCliente() {
    this.descuentoService.DescuentosPorCliente(this.clienteConsuta.identificacion).subscribe(r => {
      this.listaDescuentos = r;
      this.sliceDescuentosRegistrados();
    });
  }
  sliceDescuentosRegistrados() {
    this.totalDescuentosRegitrados = this.listaDescuentos.length;
    this.listaDescuentos = this.listaDescuentos.slice((this.pageDescuentosRegistrados - 1) * this.pageSizeDescuentosRegistrados, (this.pageDescuentosRegistrados - 1) * this.pageSizeDescuentosRegistrados + this.pageSizeDescuentosRegistrados);
  }
  productosSindescuento() {
    this.descuentoParaTodos = 0;
    this.descuentoService.ProductosSinDescuento(this.clienteConsuta.identificacion).subscribe(r => {
      this.listaProductosSinDescuento = r;
      this.listaDescuentosNuevos = [];
      this.listaProductosSinDescuento.forEach(producto => {
        this.descuentoNuevo = new Descuento();
        this.descuentoNuevo.codProducto = producto.codigo;
        this.descuentoNuevo.nombreProducto = producto.nombre;
        this.descuentoNuevo.idPersona = this.clienteConsuta.identificacion;
        this.descuentoNuevo.porcentaje = 0;
        this.descuentoNuevo.codigo = '123';
        this.listaDescuentosNuevos.push(this.descuentoNuevo);
      });
      this.sliceDescuentosNuevos();
    })
  }
  sliceDescuentosNuevos() {
    this.totalDescuentosNuevos = this.listaProductosSinDescuento.length;
    this.listaProductosSinDescuento = this.listaProductosSinDescuento.slice((this.pageDescuentosNuevos - 1) * this.pageSizeDescuentosNuevos, (this.pageDescuentosNuevos - 1) * this.pageSizeDescuentosNuevos + this.pageSizeDescuentosNuevos);
  }
  validarSesion() {
    this.authenticationService.currentUser.subscribe(x => {
      this.usuario = x;
      if (this.usuario == null) {
        this.router.navigate(['/Login']);
      } else {
        this.Rol = this.usuario.rol;
      }
    });
  }
  productos() {
    this.productoService.todos().subscribe(
      r => {
        this.listaProductos = r
        this.sliceProductos();
      }
    )
  }
  sliceProductos() {
    this.totalProductos = this.listaProductos.length;
    this.listaProductos = this.listaProductos.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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
  private buildForm() {
    this.clienteRegistrar = new Cliente();
    this.clienteRegistrar.apellidos = '';
    this.clienteRegistrar.identificacion = '';
    this.clienteRegistrar.nombres = '';
    this.clienteRegistrar.tipoCliente = '';
    var contrasena: string = '';
    this.contrasenaconfirmar = '';
    var correo: string = '';


    this.producto = new Producto();
    this.producto.cantidad = 1;
    this.producto.nombre = '';
    this.producto.valor = 0;
    this.producto.descripcion = '';
    this.producto.codigo = '';
    this.producto.cantidadMinima = 1;
    this.producto.categoria = '';

    this.formularioRegistroCliente = this.formBuilder.group({
      identificacion: [this.clienteRegistrar.identificacion, Validators.required],
      nombres: [this.clienteRegistrar.nombres, Validators.required],
      apellidos: [this.clienteRegistrar.apellidos, [Validators.required]],
      tipoCliente: [this.clienteRegistrar.tipoCliente, Validators.required],
      contrasena: [contrasena, Validators.required],
      contrasenaconfirmar: [this.contrasenaconfirmar, [Validators.required]],
      correo: [correo, Validators.required]
    });

    this.formularioregistroProducto = this.formBuilder.group({
      cantidad: [this.producto.cantidad, Validators.required],
      nombre: [this.producto.nombre, Validators.required],
      valor: [this.producto.valor, Validators.required],
      descripcion: [this.producto.descripcion, Validators.required],
      codigo: [this.producto.codigo, Validators.required],
      cantidadMinima: [this.producto.cantidadMinima, Validators.required],
      categoria: [this.producto.categoria, Validators.required]
    });
  }
  get control() {
    return this.formularioRegistroCliente.controls;
  }
  get controlProducto() {
    return this.formularioregistroProducto.controls;
  }
  verProducto(producto: Producto) {
    this.productoConsulta = producto;
    this.mostrar = "Producto";
  }
  vercliente(cliente: Cliente) {
    this.clienteConsuta = cliente;
    switch (this.mostrarInterno) {
      case "Cliente":
        this.mostrar = 'Cliente';
        break;
      case "Descuentos":
        this.mostrar = 'DescuentosCliente';
        break;
      case "RegistrarPedido":
        this.pedidoGenrado = new Pedido();
        this.mostrar = "SelccionarProductosPedido";
        break;
    }
  }
  onSubmit() {
    if (this.formularioRegistroCliente.invalid) {
      return;
    }
    this.registrarCliente();
  }
  onSubmitProducto() {
    if (this.formularioregistroProducto.invalid) {
      return;
    }
    this.registrarProducto();
  }
  registrarProducto() {
    if (this.selectedFile != null) {
      this.producto = this.formularioregistroProducto.value;
      this.productoService.registrar(this.producto, this.imagenRegistrar).subscribe(
        respuesta => {
          if (!respuesta.error) {
            this.modalMaterialService.openDialogInfo("BIEN HECHO.","Producto registrado correctamente.");
            this.productos();
          }
        }
      );
    } else {
      this.modalMaterialService.openDialogInfo("ALERTA", "Debe seleccionar una imagen",2);
    }
  }
  registrarCliente() {
    this.clienteRegistrar = this.formularioRegistroCliente.value;
    this.clienteRegistrar.descuentos = [];
    this.usuarioRegistrar = new Usuario();
    this.usuarioRegistrar.contraseña = this.formularioRegistroCliente.value.contrasena;
    this.usuarioRegistrar.correo = this.formularioRegistroCliente.value.correo;
    this.usuarioRegistrar.rol = "Cliente";
    this.usuarioRegistrar.idPersona = this.clienteRegistrar.identificacion;


    if (this.formularioRegistroCliente.value.contrasenaconfirmar != this.formularioRegistroCliente.value.contrasena) {
      this.modalMaterialService.openDialogInfo("ALERTA.","Las contraseñas no coninciden",2);
    } else {
      this.crearCliente();
    }
  }
  crearCliente(){
    this.clienteService.post(this.clienteRegistrar, this.usuarioRegistrar).subscribe
    (
      r => {
        this.modalMaterialService.openDialogInfo("BIEN HECHO","Cliente registrado. Cuenta de cliente creada.");
        this.clientes();
      }
    );
  }
  pedirInforAdministrador() {
    this.administradorService.buscar(this.usuario.idPersona).subscribe(
      respuesta => {
        this.administrador = respuesta.objeto;
      }
    )
  }
  atualizarInformacion(tipoInformacion: string) {
    switch (this.Rol) {
      case "Cliente":

        break;
      case "Domiciliario":

        break;
      case "Administrador":
        this.actualizarInformacionAdministrador();
        break;
    }
  }
  actualizarInformacionAdministrador() {
    var administradorInformacionNueva = this.administrador;
    var acumulado: number;
    acumulado = 0;
    if (confirm("Se actualizaran solo los campos en los que ingreso datos. ¿De acuerdo?")) {
      this.administradorActualizar.identificacion = this.usuario.idPersona;
      if (this.administradorActualizar.nombres != undefined && this.administradorActualizar.nombres.trim() != "") {
        acumulado++;
        administradorInformacionNueva.nombres = this.administradorActualizar.nombres;
      }
      if (this.administradorActualizar.apellidos != undefined && this.administradorActualizar.apellidos.trim() != "") {
        acumulado++;
        administradorInformacionNueva.apellidos = this.administradorActualizar.apellidos;
      }
      if (this.administradorActualizar.puesto != undefined && this.administradorActualizar.puesto.trim() != "") {
        acumulado++;
        administradorInformacionNueva.puesto = this.administradorActualizar.puesto;
      }
      if (this.administradorActualizar.telefono != undefined && this.administradorActualizar.telefono.trim() != "") {
        acumulado++;
        administradorInformacionNueva.telefono = this.administradorActualizar.telefono;
      }
      if (this.administradorActualizar.whatsapp != undefined && this.administradorActualizar.whatsapp.trim() != "") {
        acumulado++;
        administradorInformacionNueva.whatsapp = this.administradorActualizar.whatsapp;
      }
      if (acumulado > 0) {
        this.administradorService.Actualizar(administradorInformacionNueva).subscribe(r => {
          this.pedirInforAdministrador();
          alert("Datos actualizados personales correctamente");
        });
      }
      acumulado = 0;
      if (this.contrasenaActualizar != undefined && this.contrasenaActualizar.trim() != "") {
        acumulado++;
      }
      if (this.contrasenaconfirmar != undefined && this.contrasenaconfirmar.trim() != "") {
        acumulado++;
      }
      if (acumulado > 0) {
        if (acumulado == 2) {
          if (this.contrasenaActualizar == this.contrasenaconfirmar) {
            this.usuario.contraseña = this.contrasenaconfirmar;
            this.usuarioService.actualizarContraseña(this.usuario).pipe(first()).subscribe(
              data => {
              this.usuario.contraseña = null;
              alert("Contraseña actualizada");
            });
          } else {
            alert("Las contraseñas no coinsiden");
          }
        } else {
          alert("Para actualizar la contraseña debe ingresar la contraseña y confirmarla.");
        }
      }
    }
  }
  alertaRespuestaError(Respuesta){
    const messageBox = this.modalService.open(AlertModalComponent)
    messageBox.componentInstance.title = "ALERTA.";
    messageBox.componentInstance.message = Respuesta.error.mensaje;
  }
}
