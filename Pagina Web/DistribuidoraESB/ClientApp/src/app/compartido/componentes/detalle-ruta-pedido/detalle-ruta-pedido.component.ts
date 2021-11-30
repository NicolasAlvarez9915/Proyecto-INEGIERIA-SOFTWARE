import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PedidoService} from '../../../services/pedido.service';
import {Pedido} from '../../../ESB/Models/pedido';
import {Cliente} from '../../../ESB/Models/cliente';
import {ClienteService} from '../../../services/cliente.service';

@Component({
  selector: 'app-detalle-ruta-pedido',
  templateUrl: './detalle-ruta-pedido.component.html',
  styleUrls: ['./detalle-ruta-pedido.component.scss']
})
export class DetalleRutaPedidoComponent implements OnInit {

  pedido: Pedido;
  cliente: Cliente;
  listaEstadosDisponiblePedido: string[];
  estadoPedido: string;
  constructor(public dialogRef: MatDialogRef<DetalleRutaPedidoComponent>,
              private pedidoService: PedidoService,
              private clienteService: ClienteService,
              @Inject(MAT_DIALOG_DATA) public datos) {

  }

  ngOnInit(): void {
    this.obtenerInformacion();
  }

  obtenerInformacion() {
    this.pedidoService.BuscarPedido(this.datos.idPedido).subscribe(Pedido => {
      this.pedido = Pedido.objeto;
      this.validarEstadosDisponibles();
      this.clienteService.buscar(this.pedido.idPersona).subscribe(Cliente =>{
        this.cliente = Cliente.objeto;
      })
    })
  }

  validarEstadosDisponibles() {
    let estados = ["Bodega","En camino", "Entregado"];
    this.listaEstadosDisponiblePedido = [];
    let encontrado = false;
    estados.forEach(estado => {
      if(encontrado){
        this.listaEstadosDisponiblePedido.push(estado);
      }
      if(estado == this.pedido.estado){
        encontrado = true;
      }
    })
  }
  actualizarPedido() {
    if(this.estadoPedido != undefined)
    {
      this.pedidoService.Actualizar(this.pedido, this.estadoPedido).subscribe(r => {
        this.obtenerInformacion();
      });
    }
  }
}
