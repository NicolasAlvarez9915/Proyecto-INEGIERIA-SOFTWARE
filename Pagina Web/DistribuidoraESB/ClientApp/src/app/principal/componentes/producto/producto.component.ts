import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductoService} from '../../../services/producto.service';
import {Producto} from '../../../ESB/Models/producto';
import {ModalService} from '../../../compartido/servicios/modal.service';
import {PedidoService} from '../../../services/pedido.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  producto: Producto;
  cantidad = 1;
  constructor(private pedidoService: PedidoService,private productoService: ProductoService,public dialogRef: MatDialogRef<ProductoComponent>,
              @Inject(MAT_DIALOG_DATA) public datos, private modalService: ModalService) {
    this.productoService.buscar(datos.codigo).subscribe(respuesta =>{
      if(!respuesta.error)
      {
        this.producto = respuesta.objeto;
      }
    });
  }

  ngOnInit(): void {
  }

  agregarProductoAlCarrito()
  {
    if(this.cantidad < 1 || this.cantidad > this.producto.cantidad)
    {
      this.modalService.openDialogInfo("Cantidad erronea","Debe ingresar una cantidad entre 0 y "+ this.producto.cantidad, 2);
    }else{
      const productoAgregar = this.producto;
      productoAgregar.cantidad = this.cantidad;
      this.pedidoService.AnadirProductoAlCarro(productoAgregar);
      this.modalService.openDialogInfo("Producto agregado", "Gracias por su compra");
      this.dialogRef.close();
    }
  }

}
