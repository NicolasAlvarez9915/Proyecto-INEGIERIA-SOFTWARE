import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  editarInforPersonal(){
    document.getElementById("formularioEditarPersonal").classList.remove("Ocultar");
    document.getElementById("formularioEditarPersonal").classList.add("Mostrar");
    document.getElementById("formularioEditarDomicilio").classList.remove("Mostrar");
    document.getElementById("formularioEditarDomicilio").classList.add("Ocultar");
  }

  volver(){
    document.getElementById("formularioEditarPersonal").classList.remove("Mostrar");
    document.getElementById("formularioEditarPersonal").classList.add("Ocultar");
    document.getElementById("formularioEditarDomicilio").classList.remove("Mostrar");
    document.getElementById("formularioEditarDomicilio").classList.add("Ocultar");
  }

  editarInforDomicilio(){
    document.getElementById("formularioEditarDomicilio").classList.remove("Ocultar");
    document.getElementById("formularioEditarDomicilio").classList.add("Mostrar");
    document.getElementById("formularioEditarPersonal").classList.remove("Mostrar");
    document.getElementById("formularioEditarPersonal").classList.add("Ocultar");
  }
}
