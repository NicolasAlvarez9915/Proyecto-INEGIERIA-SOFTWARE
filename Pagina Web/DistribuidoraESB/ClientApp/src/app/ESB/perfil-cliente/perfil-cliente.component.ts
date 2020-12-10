import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { DescuentoService } from 'src/app/services/descuento.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Cliente } from '../Models/cliente';
import { Descuento } from '../Models/descuento';
import { Pedido } from '../Models/pedido';
import { Usuario } from '../Models/usuario';

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
    private descuentoService: DescuentoService
  ) { }

  ngOnInit(): void {
    this.validarSesion(); 
    this.pedirInforCliente();
    
  }

  mostrarDescuentosCliente() {
    this.descuentoService.DescuentosPorCliente(this.cliente.identificacion).subscribe(r => {
      this.listaDescuentos = r;
    });
  }

  pedirInforCliente() {
    this.clienteService.buscar(this.usuario.idPersona).subscribe(
      r => {
        this.cliente = r;
      }
    )
  }

  validarSesion() {
    this.usuario = this.usuarioService.UsuarioLogueado();
    if (this.usuario == null) {
      this.router.navigate(['/Login']);
    }
    document.getElementById("BtnLogin").innerHTML = "LOG OUT";
    document.getElementById("BtnRegistrar").classList.add("Ocultar");
    document.getElementById("BtnRegistrar").classList.remove("Mostrar");
  }

  buscarPedido(codigo: string) {
    this.pedidoService.BuscarPedido(codigo).subscribe(r => {
      this.pedidoSeleccionado = r;
    })
  }

  PedidosEntregadosCliente(){
    this.pedidoService.PedidosEntregadosCliente(this.cliente.identificacion).subscribe(r  =>{
      this.listaPedidosEntregados = r;
    });
  }

  PedidosEnProcesoCliente(){
    this.pedidoService.PedidosEnProcesoCliente(this.cliente.identificacion).subscribe(r  =>{
      this.lsitaPedidosEnProceso = r;
    });
  }
  
}
