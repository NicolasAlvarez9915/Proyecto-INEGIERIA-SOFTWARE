import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../Models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  i: number;
  existe: Boolean;
  constructor(private router: Router,private service: UsuarioService) { }

  ngOnInit(): void {
    this.validarRol();
  }


  validarRol(){
    this.usuario = this.service.UsuarioLogueado();
    if(this.usuario == null){
      this.router.navigate(['/Login']);
    }
    document.getElementById("BtnLogin").innerHTML = "lOG OUT";
    document.getElementById("BtnRegistrar").classList.add("Ocultar");
    document.getElementById("BtnRegistrar").classList.remove("Mostrar");
    let Rol = this.usuario.rol;
    switch (Rol){
      case "Cliente":
        document.getElementById("formularioCliente").classList.add("Mostrar");
        document.getElementById("BarraCliente").classList.add("Mostrar");
        document.getElementById("BarraDomiciliario").classList.add("Ocultar");
        document.getElementById("formularioDomiciliario").classList.add("Ocultar");
        document.getElementById("formularioAdministrador").classList.add("Ocultar");
        document.getElementById("BarraAdministrador").classList.add("Ocultar");
      break;
      case "Domiciliario":
        document.getElementById("formularioCliente").classList.add("Ocultar");
        document.getElementById("BarraCliente").classList.add("Ocultar");
        document.getElementById("BarraDomiciliario").classList.add("Mostrar");
        document.getElementById("formularioDomiciliario").classList.add("Mostrar");
        document.getElementById("formularioAdministrador").classList.add("Ocultar");
        document.getElementById("BarraAdministrador").classList.add("Ocultar");
      break;
      case "Administrador":
        document.getElementById("formularioCliente").classList.add("Ocultar");
        document.getElementById("BarraCliente").classList.add("Ocultar");
        document.getElementById("BarraDomiciliario").classList.add("Ocultar");
        document.getElementById("formularioDomiciliario").classList.add("Ocultar");
        document.getElementById("formularioAdministrador").classList.add("Mostrar");
        document.getElementById("BarraAdministrador").classList.add("Mostrar");
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
