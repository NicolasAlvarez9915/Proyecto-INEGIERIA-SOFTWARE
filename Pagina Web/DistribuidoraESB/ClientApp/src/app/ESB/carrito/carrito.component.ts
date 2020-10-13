import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  volver(){
    document.getElementById("formularioEditarDomicilio").classList.remove("Mostrar");
    document.getElementById("formularioEditarDomicilio").classList.add("Ocultar");
  }

  editarInforDomicilio(){
    document.getElementById("formularioEditarDomicilio").classList.remove("Ocultar");
    document.getElementById("formularioEditarDomicilio").classList.add("Mostrar");
  }
}
