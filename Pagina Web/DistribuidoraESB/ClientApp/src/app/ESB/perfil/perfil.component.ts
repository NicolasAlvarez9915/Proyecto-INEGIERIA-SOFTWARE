import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  
  i: number;
  existe: Boolean;
  constructor() { }

  ngOnInit(): void {
    this.validarRol();
  }


  validarRol(){
    let Rol = "Cliente";
    switch (Rol){
      case "Cliente":
        document.getElementById("formularioCliente").classList.add("Mostrar");
        document.getElementById("BarraCliente").classList.add("Mostrar");
        document.getElementById("BarraDomiciliario").classList.add("Ocultar");
        document.getElementById("formularioDomiciliario").classList.add("Ocultar");
      break;
      case "Domiciliario":
        document.getElementById("formularioCliente").classList.add("Ocultar");
        document.getElementById("BarraCliente").classList.add("Ocultar");
        document.getElementById("BarraDomiciliario").classList.add("Mostrar");
        document.getElementById("formularioDomiciliario").classList.add("Mostrar");
      break;
      case "Administrador":
        document.getElementById("formularioCliente").classList.add("Ocultar");
        document.getElementById("BarraCliente").classList.add("Ocultar");
        document.getElementById("BarraDomiciliario").classList.add("Ocultar");
        document.getElementById("formularioDomiciliario").classList.add("Ocultar");
      break;
    }
  }

  alternarBarra(){
    var i: number;
    var clases = document.getElementById("barraLateral").classList;
    var existe: boolean;
    existe = false;
    for (i = 0; i<clases.length; i++){
      if(clases[i] === "Mostrar"){
        existe = true;
      }
    }
    if(existe){
      document.getElementById("barraLateral").classList.remove("Mostrar");
      document.getElementById("barraLateral").classList.add("Ocultar");
    }else{
      document.getElementById("barraLateral").classList.remove("Ocultar");
      document.getElementById("barraLateral").classList.add("Mostrar");
    }

  }
}
