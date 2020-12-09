import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  constructor(private service: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.validarSesion();
  }

  validarSesion() {
    if (this.service.UsuarioLogueado() == null) {
      document.getElementById("BtnLogin").innerHTML = "lOG";
      document.getElementById("BtnRegistrar").classList.add("Mostrar");
      document.getElementById("BtnRegistrar").classList.remove("Ocultar");
    } else {
      document.getElementById("BtnLogin").innerHTML = "lOG OUT";
      document.getElementById("BtnRegistrar").classList.add("Ocultar");
      document.getElementById("BtnRegistrar").classList.remove("Mostrar");
    }
  }

  RedirigirPerfil() {
    let Usuario = this.service.UsuarioLogueado();
    if (Usuario == null) {
      this.router.navigate(['/Login']);
    } else {

      if (Usuario.rol == "Administrador") {
        this.router.navigate(['/Perfil']);
      } else {
        this.router.navigate(['/PerfilCliente']);
      }
    }
  }
}
