import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../ESB/Models/usuario';
import { AuthenticationService } from '../services/authentication.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  currentUser: Usuario = new Usuario();

  constructor(private service: UsuarioService, private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/Login']);
  }




  RedirigirPerfil() {
    if (this.currentUser == null) {
      this.router.navigate(['/Login']);
    } else {
      if (this.currentUser.rol == "Administrador") {
        this.router.navigate(['/Perfil']);
      } else {
        this.router.navigate(['/PerfilCliente']);
      }
    }
  }
}
