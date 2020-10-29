import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { AdministradorService } from 'src/app/services/administrador.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Administrador } from '../Models/administrador';
import { Usuario } from '../Models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  administrador: Administrador;
  administradorActualizar: Administrador;
  contrasenaActualizar: string;
  contrasenaconfirmar: string;
  i: number;
  existe: Boolean;
  Rol: string;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private administradorService: AdministradorService
    ) { 
      this.administradorActualizar = new Administrador();
    }

  ngOnInit(): void {
    this.validarRol();
    
    this.administrador = new Administrador();
  }


  validarRol(){
    this.usuario = this.usuarioService.UsuarioLogueado();
    if(this.usuario == null){
      this.router.navigate(['/Login']);
    }
    document.getElementById("BtnLogin").innerHTML = "lOG OUT";
    document.getElementById("BtnRegistrar").classList.add("Ocultar");
    document.getElementById("BtnRegistrar").classList.remove("Mostrar");
    this.Rol = this.usuario.rol;
    switch (this.Rol){
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
        this.pedirInforAdministrador();
      break;
    }
  }

  pedirInforAdministrador()
  {
    this.administradorService.buscar(this.usuario.idPersona).subscribe(
      r => {
        this.administrador = r;
      }
    )
  }

  atualizarInformacion(tipoInformacion: string)
  {
    switch (this.Rol){
      case "Cliente":
        
      break;
      case "Domiciliario":
        
      break;
      case "Administrador":
        this.actualizarInformacionAdministrador();
      break;
    }
  }

  actualizarInformacionAdministrador()
  {
    if(this.administradorActualizar.nombres != undefined && this.administradorActualizar.nombres.trim() != "" )
    {
      if (confirm('¿Desea cambiar su nombre?')) {
        this.administrador.nombres = this.administradorActualizar.nombres;
      }
    }
  }

  alternarBarra(){
    var i: number;
    var clases = document.getElementById("barraLateral").classList;
    var existe: boolean;
    existe = false;
    for (i = 0; i<clases.length; i++){
      if(clases[i] === "Ocultar"){
        existe = true;
      }
    }
    if(existe){
      document.getElementById("barraLateral").classList.remove("Ocultar");
        document.getElementById("barraLateral").classList.add("Mostrar");
    }else{
      document.getElementById("barraLateral").classList.add("Ocultar");
      document.getElementById("barraLateral").classList.remove("Mostrar");
    }
  }
}
