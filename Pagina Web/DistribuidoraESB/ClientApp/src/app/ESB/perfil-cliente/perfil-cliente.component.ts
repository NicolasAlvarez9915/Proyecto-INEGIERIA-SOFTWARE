import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../Models/usuario';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  usuario: Usuario;
  activa: boolean = false;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validarSesion(); 
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

}
